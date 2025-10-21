<template>
	<div
		class="cdx-language-selector"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- Input -->
		<div class="cdx-language-selector__input-wrapper" @click="onInputClick">
			<cdx-text-input
				ref="input"
				v-model="inputValue"
				class="cdx-language-selector__input"
				:class="{
					'cdx-language-selector__input--expanded': expanded,
					'cdx-language-selector__input--disabled': computedDisabled
				}"
				input-type="search"
				:start-icon="cdxIconSearch"
				:end-icon="cdxIconExpand"
				:disabled="computedDisabled"
				:status="status"
				placeholder="Search languages"
				v-bind="otherAttrs"
				@input="onMainInput"
				@change="onMainChange"
				@focus="onInputFocus"
				@blur="onInputBlur"
				@keydown="onInputKeydown"
			/>
		</div>

		<!-- Dropdown Menu -->
		<div
			v-if="expanded"
			:id="menuId"
			ref="menu"
			class="cdx-language-selector__menu"
		>
			<!-- Suggested Languages -->
			<div
				v-if="!searchQuery && suggestedLanguages.length > 0"
				class="cdx-language-selector__suggested">
				<div class="cdx-language-selector__section-header">
					Suggested
				</div>
				<div class="cdx-language-selector__suggested-grid">
					<button
						v-for="lang in suggestedLanguages"
						:key="lang.value"
						class="cdx-language-selector__suggested-item"
						:class="{
							'cdx-language-selector__suggested-item--selected':
								lang.value === modelWrapper
						}"
						@click="selectLanguage( lang.value )"
					>
						{{ lang.label }}
					</button>
				</div>
			</div>

			<!-- All Languages List -->
			<div class="cdx-language-selector__languages">
				<div class="cdx-language-selector__section-header">
					{{ searchQuery ? 'Search Results' : 'All languages' }}
				</div>
				<div class="cdx-language-selector__languages-list">
					<button
						v-for="lang in filteredLanguages"
						:key="lang.value"
						class="cdx-language-selector__language-item"
						:class="{
							'cdx-language-selector__language-item--selected':
								lang.value === modelWrapper
						}"
						@click="selectLanguage( lang.value )"
					>
						<span class="cdx-language-selector__language-name">{{ lang.label }}</span>
					</button>
				</div>
			</div>

			<!-- No Results -->
			<div
				v-if="searchQuery && filteredLanguages.length === 0"
				class="cdx-language-selector__no-results"
			>
				No languages found
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	computed,
	defineComponent,
	ref,
	toRef,
	watch,
	useId
} from 'vue';
import { cdxIconExpand, cdxIconSearch } from '@wikimedia/codex-icons';

import CdxTextInput from '../text-input/TextInput.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';

import { MenuItemData, ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A text input with an expandable menu of language options that can be filtered by typing.
 */
export default defineComponent( {
	name: 'CdxLanguageSelector',
	components: {
		CdxTextInput
	},

	/**
	 * Attributes applied to this component by a parent will be applied
	 * to the TextInput child component rather than the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Language items array.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},

		/**
		 * Value of the current selection.
		 *
		 * Must be bound with `v-model:selected`.
		 */
		selected: {
			type: [ String, Number ] as PropType<string|number>,
			default: ''
		},

		/**
		 * Suggested languages to show at the top.
		 */
		suggestedLanguages: {
			type: Array as PropType<MenuItemData[]>,
			default: () => []
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},

		/**
		 * `status` property of the component
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		}
	},

	emits: [
		/**
		 * When the selected value changes.
		 *
		 * @property {string | number} selected The new selected value
		 */
		'update:selected',
		/**
		 * When the user scrolls towards the bottom of the menu.
		 *
		 * If it is possible to add or load more menu items, then now would be a good moment
		 * so that the user can experience infinite scrolling.
		 */
		'load-more',
		/**
		 * When the input value changes via direct use of the input
		 *
		 * @property {InputEvent} event
		 */
		'input',
		/**
		 * When an input value change is committed by the user (e.g. on blur)
		 *
		 * @property {Event} event
		 */
		'change',
		/**
		 * When the input comes into focus
		 *
		 * @property {FocusEvent} event
		 */
		'focus',
		/**
		 * When the input loses focus
		 *
		 * @property {FocusEvent} event
		 */
		'blur'
	],

	setup( props, { emit, attrs } ) {
		const input = ref<HTMLDivElement>();
		const menu = ref<HTMLDivElement>();
		const menuId = useId();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const searchQuery = ref( '' );

		const {
			computedDisabled
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const internalClasses = computed( () => ( {
			'cdx-language-selector--expanded': expanded.value,
			'cdx-language-selector--disabled': computedDisabled.value
		} ) );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const selectedLanguageLabel = computed( () => {
			const selectedItem = props.menuItems.find(
				( item ) => item.value === modelWrapper.value
			);
			return selectedItem?.label;
		} );

		const inputValue = computed( {
			get: () => {
				// If we have a search query, show it
				if ( searchQuery.value ) {
					return searchQuery.value;
				}
				// Otherwise show the selected language
				return selectedLanguageLabel.value ?? '';
			},
			set: ( value: string ) => {
				searchQuery.value = value;
			}
		} );

		// Filter languages based on search query
		const filteredLanguages = computed( () => {
			if ( !searchQuery.value.trim() ) {
				return props.menuItems;
			}

			const query = searchQuery.value.toLowerCase();
			return props.menuItems.filter( ( item ) => {
				const labelMatch = item.label?.toLowerCase().includes( query );
				const valueMatch = item.value.toString().toLowerCase().includes( query );
				const descMatch = item.description?.toLowerCase().includes( query );
				return labelMatch ?? valueMatch ?? descMatch;
			} );
		} );

		// Event handlers
		function onInputClick(): void {
			if ( computedDisabled.value ) {
				return;
			}
			expanded.value = !expanded.value;
		}

		function onMainInput( event: Event ): void {
			// Open dropdown when user starts typing
			if ( !expanded.value ) {
				expanded.value = true;
			}
			emit( 'input', event );
		}

		function onMainChange( event: Event ): void {
			emit( 'change', event );
		}

		function onInputKeydown( e: KeyboardEvent ): void {
			if ( computedDisabled.value ) {
				return;
			}
			if ( e.key === 'Escape' ) {
				expanded.value = false;
			} else if ( e.key === 'ArrowDown' ) {
				e.preventDefault();
				expanded.value = true;
			} else if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				expanded.value = !expanded.value;
			}
		}

		function onInputFocus( event: FocusEvent ): void {
			emit( 'focus', event );
		}

		function onInputBlur( event: FocusEvent ): void {
			// Close menu when focus leaves the component
			setTimeout( () => {
				if ( !menu.value?.contains( document.activeElement ) ) {
					expanded.value = false;
				}
			}, 100 );
			emit( 'blur', event );
		}

		function selectLanguage( value: string | number ): void {
			modelWrapper.value = value;
			expanded.value = false;
			searchQuery.value = '';
			// Keep focus on the input after selection
			setTimeout( () => {
				input.value?.focus();
			}, 0 );
		}

		// Close menu when clicking outside
		function handleClickOutside( event: MouseEvent ): void {
			if (
				expanded.value &&
				menu.value &&
				!menu.value.contains( event.target as Node ) &&
				!input.value?.contains( event.target as Node )
			) {
				expanded.value = false;
			}
		}

		// Add click outside listener
		watch( expanded, ( isExpanded ) => {
			if ( isExpanded ) {
				document.addEventListener( 'click', handleClickOutside );
			} else {
				document.removeEventListener( 'click', handleClickOutside );
			}
		} );

		return {
			input,
			menu,
			menuId,
			expanded,
			searchQuery,
			computedDisabled,
			inputValue,
			filteredLanguages,
			modelWrapper,
			onInputClick,
			onMainInput,
			onMainChange,
			onInputKeydown,
			onInputFocus,
			onInputBlur,
			selectLanguage,
			cdxIconExpand,
			cdxIconSearch,
			rootClasses,
			rootStyle,
			otherAttrs
		};
	},

	methods: {
		/**
		 * Focus the component's main input element.
		 *
		 * @public
		 */
		focus(): void {
			const input = this.$refs.input as InstanceType<typeof CdxTextInput>;
			input.focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-language-selector {
	display: inline-block;
	position: relative;
	width: 100%;
	max-width: 300px;

	&__input-wrapper {
		position: relative;
		width: 100%;
	}

	&__input {
		cursor: pointer;

		// Enhanced TextInput styling
		.cdx-text-input__input {
			cursor: pointer;
			transition: border-color 0.2s ease, box-shadow 0.2s ease;

			&:hover {
				border-color: @border-color-progressive;
			}

			&:focus {
				border-color: @border-color-progressive;
				box-shadow: 0 0 0 2px @outline-color-progressive--focus;
			}

			&::placeholder {
				color: @color-subtle;
				font-style: italic;
			}
		}

		&--expanded {
			.cdx-text-input__input {
				border-color: @border-color-progressive;
				box-shadow: 0 0 0 2px @outline-color-progressive--focus;
			}
		}

		&--disabled {
			.cdx-text-input__input {
				background-color: @background-color-disabled;
				border-color: @border-color-disabled;
				cursor: not-allowed;
				opacity: 0.6;

				&:hover {
					border-color: @border-color-disabled;
				}

				&:focus {
					border-color: @border-color-disabled;
					box-shadow: none;
				}
			}
		}

		// Rotate the end icon when expanded
		&--expanded .cdx-text-input__end-icon {
			transform: rotate(180deg);
			transition: transform 0.2s ease;
		}

		// Style the icons
		.cdx-text-input__start-icon,
		.cdx-text-input__end-icon {
			color: @color-subtle;
			transition: color 0.2s ease;
		}

		&:hover {
			.cdx-text-input__start-icon,
			.cdx-text-input__end-icon {
				color: @color-base;
			}
		}

		&--expanded {
			.cdx-text-input__start-icon,
			.cdx-text-input__end-icon {
				color: @color-base;
			}
		}
	}

	&__menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 1000;
		margin-top: @spacing-25;
		background-color: @background-color-base;
		border: 1px solid @border-color-base;
		border-radius: @border-radius-base;
		box-shadow: @box-shadow-drop-medium;
		max-height: 400px;
		overflow: hidden;
	}

	&__suggested {
		padding: @spacing-100;
		border-bottom: 1px solid @border-color-subtle;
	}

	&__section-header {
		font-size: @font-size-small;
		font-weight: @font-weight-semi-bold;
		color: @color-subtle;
		margin-bottom: @spacing-75;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	&__suggested-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: @spacing-50;
	}

	&__suggested-item {
		padding: @spacing-75 @spacing-100;
		border: 1px solid @border-color-subtle;
		border-radius: @border-radius-base;
		background-color: @background-color-base;
		color: @color-base;
		font-size: @font-size-medium;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;

		&:hover {
			background-color: @background-color-progressive-subtle;
			border-color: @border-color-progressive;
		}

		&--selected {
			background-color: @background-color-progressive;
			color: @color-inverted;
			border-color: @border-color-progressive;
		}
	}

	&__languages {
		max-height: 200px;
		overflow-y: auto;
        padding: @spacing-100;
	}

	&__language-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: @spacing-75 @spacing-100;
		border: none;
		background: none;
		color: @color-base;
		font-size: @font-size-medium;
		cursor: pointer;
		transition: background-color 0.2s ease;
		text-align: left;

		&:hover {
			background-color: @background-color-progressive-subtle;
		}

		&--selected {
			background-color: @background-color-progressive;
			color: @color-inverted;
		}
	}

	&__language-name {
		font-weight: @font-weight-semi-bold;
	}

	&__no-results {
		padding: @spacing-200;
		text-align: center;
		color: @color-subtle;
		font-style: italic;
	}

	&--disabled {
		.cdx-language-selector__input {
			background-color: @background-color-disabled;
			border-color: @border-color-disabled;
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
}
</style>
