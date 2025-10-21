<template>
	<div
		class="cdx-language-selector"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- Input -->
		<div
			ref="input"
			class="cdx-language-selector__input"
			:class="{
				'cdx-language-selector__input--expanded': expanded,
				'cdx-language-selector__input--disabled': computedDisabled
			}"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-disabled="computedDisabled"
			:tabindex="computedDisabled ? -1 : 0"
			role="button"
			@click="onInputClick"
			@keydown="onInputKeydown"
			@focus="onInputFocus"
			@blur="onInputBlur"
		>
			<div class="cdx-language-selector__input-content">
				<div class="cdx-language-selector__input-icon">
					<cdx-icon :icon="cdxIconSearch" />
				</div>
				<span class="cdx-language-selector__input-text">
					{{ selectedLanguageLabel || `Search languages` }}
				</span>
			</div>
			<cdx-icon
				class="cdx-language-selector__input-arrow"
				:icon="cdxIconExpand"
			/>
		</div>

		<!-- Dropdown Menu -->
		<div
			v-if="expanded"
			:id="menuId"
			ref="menu"
			class="cdx-language-selector__menu"
		>
			<!-- Search Section -->
			<div class="cdx-language-selector__search-section">
				<div class="cdx-language-selector__search-wrapper">
					<cdx-icon
						class="cdx-language-selector__search-icon"
						:icon="cdxIconSearch"
					/>
					<input
						ref="searchInput"
						v-model="searchQuery"
						class="cdx-language-selector__search-input"
						placeholder="Search languages"
						@input="onSearchInput"
						@keydown="onSearchKeydown"
					>
				</div>
			</div>

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

import CdxIcon from '../icon/Icon.vue';

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
		CdxIcon
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
		const searchInput = ref<HTMLInputElement>();
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
			rootStyle
		} = useSplitAttributes( attrs, internalClasses );

		const selectedLanguageLabel = computed( () => {
			const selectedItem = props.menuItems.find( ( item ) => item.value === modelWrapper.value );
			return selectedItem?.label;
		} );

		// Filter languages based on search query
		const filteredLanguages = computed( () => {
			if ( !searchQuery.value.trim() ) {
				return props.menuItems;
			}

			const query = searchQuery.value.toLowerCase();
			return props.menuItems.filter( ( item ) => item.label?.toLowerCase().includes( query ) ??
				item.value.toString().toLowerCase().includes( query ) ??
				item.description?.toLowerCase().includes( query )
			);
		} );

		// Event handlers
		function onInputClick(): void {
			if ( computedDisabled.value ) {
				return;
			}
			expanded.value = !expanded.value;
			if ( expanded.value ) {
				// Focus search input when opening
				setTimeout( () => {
					searchInput.value?.focus();
				}, 0 );
			}
		}

		function onInputKeydown( e: KeyboardEvent ): void {
			if ( computedDisabled.value ) {
				return;
			}
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				onInputClick();
			} else if ( e.key === 'Escape' ) {
				expanded.value = false;
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

		function onSearchInput( event: Event ): void {
			const target = event.target as HTMLInputElement;
			searchQuery.value = target.value;
			emit( 'input', event );
		}

		function onSearchKeydown( e: KeyboardEvent ): void {
			if ( e.key === 'Escape' ) {
				expanded.value = false;
				input.value?.focus();
			}
		}

		function selectLanguage( value: string | number ): void {
			modelWrapper.value = value;
			expanded.value = false;
			searchQuery.value = '';
			input.value?.focus();
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
			searchInput,
			menuId,
			expanded,
			searchQuery,
			computedDisabled,
			selectedLanguageLabel,
			filteredLanguages,
			modelWrapper,
			onInputClick,
			onInputKeydown,
			onInputFocus,
			onInputBlur,
			onSearchInput,
			onSearchKeydown,
			selectLanguage,
			cdxIconExpand,
			cdxIconSearch,
			rootClasses,
			rootStyle
		};
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

	&__input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: @spacing-75 @spacing-100;
		border: 1px solid @border-color-base;
		border-radius: @border-radius-base;
		background-color: @background-color-base;
		cursor: pointer;
		transition: border-color 0.2s ease;

		&:hover {
			border-color: @border-color-progressive;
		}

		&:focus {
			outline: 2px solid @outline-color-progressive--focus;
			outline-offset: 2px;
		}

		&--expanded {
			border-color: @border-color-progressive;
		}

		&--disabled {
			background-color: @background-color-disabled;
			border-color: @border-color-disabled;
			cursor: not-allowed;
			opacity: 0.6;
		}
	}

	&__input-content {
		display: flex;
		align-items: center;
		gap: @spacing-50;
	}

	&__input-icon {
		display: flex;
		align-items: center;
		color: @color-subtle;
	}

	&__input-text {
		font-size: @font-size-medium;
		color: @color-base;
	}

	&__input-arrow {
		color: @color-subtle;
		transition: transform 0.2s ease;
	}

	&--expanded &__input-arrow {
		transform: rotate(180deg);
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

	&__search-section {
		padding: @spacing-100;
		border-bottom: 1px solid @border-color-subtle;
	}

	&__search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	&__search-icon {
		position: absolute;
		left: @spacing-75;
		color: @color-subtle;
		pointer-events: none;
	}

	&__search-input {
		width: 100%;
		padding: @spacing-75 @spacing-75 @spacing-75 @spacing-200;
		border: 1px solid @border-color-base;
		border-radius: @border-radius-base;
		font-size: @font-size-medium;
		background-color: @background-color-base;

		&:focus {
			outline: 2px solid @outline-color-progressive--focus;
			outline-offset: 2px;
			border-color: @border-color-progressive;
		}
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
