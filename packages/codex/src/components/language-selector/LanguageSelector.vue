<template>
	<div
		class="cdx-language-selector"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- Trigger Button -->
		<cdx-button
			ref="buttonWrapper"
			class="cdx-language-selector__trigger"
			:disabled="computedDisabled"
			@click="onButtonClick"
		>
			{{ selectedLanguageLabel || 'Select language' }}
			<cdx-icon :icon="cdxIconExpand" />
		</cdx-button>

		<!-- Floating Dropdown Container -->
		<teleport :to="computedTarget" :disabled="renderInPlace">
			<div
				v-if="expanded"
				ref="floatingContainer"
				class="cdx-language-selector__container"
				:style="floatingStyles"
			>
				<!-- Input Wrapper -->
				<div
					ref="inputWrapper"
					class="cdx-language-selector__input-wrapper"
				>
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

				<!-- Header with Close Button -->
				<header v-if="useCloseButton" class="cdx-language-selector__header">
					<div class="cdx-language-selector__header__button-wrapper">
						<cdx-button
							class="cdx-language-selector__header__close-button"
							weight="quiet"
							type="button"
							:aria-label="translatedCloseButtonLabel"
							@click="close"
						>
							<cdx-icon :icon="cdxIconClose" />
						</cdx-button>
					</div>
				</header>

				<!-- Languages List -->
				<div class="cdx-language-selector__languages">
					<div class="cdx-language-selector__languages-list">
						<!-- Suggested Languages Section -->
						<template v-if="!searchQuery && suggestedLanguages.length > 0">
							<div class="cdx-language-selector__section-header">
								Suggested
							</div>
							<div
								v-for="lang in suggestedLanguages"
								:key="lang.value"
								class="cdx-language-selector__language-item"
								:class="{
									'cdx-language-selector__language-item--selected':
										lang.value === modelWrapper
								}"
								role="button"
								tabindex="0"
								@click="selectLanguage( lang.value )"
								@keydown.enter="selectLanguage( lang.value )"
							>
								<span class="cdx-language-selector__language-name">
									{{ lang.label }}
								</span>
							</div>
						</template>

						<!-- All Languages Section -->
						<template v-if="!searchQuery">
							<div class="cdx-language-selector__section-header">
								All
							</div>
							<div
								v-for="lang in allLanguages"
								:key="lang.value"
								class="cdx-language-selector__language-item"
								:class="{
									'cdx-language-selector__language-item--selected':
										lang.value === modelWrapper
								}"
								role="button"
								tabindex="0"
								@click="selectLanguage( lang.value )"
								@keydown.enter="selectLanguage( lang.value )"
							>
								<span class="cdx-language-selector__language-name">
									{{ lang.label }}
								</span>
							</div>
						</template>

						<!-- Search Results Section -->
						<template v-if="searchQuery">
							<div class="cdx-language-selector__section-header">
								Search Results
							</div>
							<div
								v-for="lang in filteredLanguages"
								:key="lang.value"
								class="cdx-language-selector__language-item"
								:class="{
									'cdx-language-selector__language-item--selected':
										lang.value === modelWrapper
								}"
								role="button"
								tabindex="0"
								@click="selectLanguage( lang.value )"
								@keydown.enter="selectLanguage( lang.value )"
							>
								<span class="cdx-language-selector__language-name">
									{{ lang.label }}
								</span>
							</div>
						</template>
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
		</teleport>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	ComponentPublicInstance,
	computed,
	defineComponent,
	inject,
	onMounted,
	ref,
	toRef,
	unref,
	watch,
	onUnmounted
} from 'vue';
import { useFloating, offset, flip, size, autoUpdate } from '@floating-ui/vue';
import { cdxIconExpand, cdxIconSearch, cdxIconClose } from '@wikimedia/codex-icons';

import CdxTextInput from '../text-input/TextInput.vue';
import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useI18nWithOverride from '../../composables/useI18nWithOverride';

import { MenuItemData, ValidationStatusType, TeleportTarget } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A text input with an expandable menu of language options that can be filtered by typing.
 */
export default defineComponent( {
	name: 'CdxLanguageSelector',
	components: {
		CdxTextInput,
		CdxButton,
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
		},

		/**
		 * Add an icon-only close button to the container header.
		 */
		useCloseButton: {
			type: Boolean,
			default: false
		},

		/**
		 * Visually-hidden label text for the icon-only close button in the header.
		 *
		 * Omit this prop to use the default value, "Close".
		 */
		closeButtonLabel: {
			type: String,
			default: 'Close'
		},

		/**
		 * Whether to disable the use of teleport and render the container in its
		 * original location in the document.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
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
		const buttonWrapper = ref<InstanceType<typeof CdxButton>>();
		const inputWrapper = ref<HTMLDivElement>();
		const input = ref<HTMLDivElement>();
		const floatingContainer = ref<HTMLDivElement>();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const searchQuery = ref( '' );

		// Floating UI constants (inspired by Popover)
		const clipPadding = 16;
		const minContainerHeight = 200;
		const maxContainerHeight = 400;
		const minContainerWidth = 192;
		const maxContainerWidth = 512;

		const {
			computedDisabled
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		// Setup Floating UI positioning (inspired by Popover)
		// Use computed to unwrap the button element for Floating UI
		const buttonElement = computed( () => {
			if ( !buttonWrapper.value ) {
				return null;
			}
			// Access $el property directly from component instance
			const component = buttonWrapper.value as ComponentPublicInstance;
			return component.$el as HTMLElement | null | undefined;
		} );
		const { floatingStyles } = useFloating( buttonElement, floatingContainer, {
			placement: 'bottom-start',
			middleware: [
				offset( 4 ),
				flip( {
					padding: clipPadding
				} ),
				size( {
					padding: clipPadding,
					apply( { elements, availableWidth, availableHeight } ) {
						// Max width possible is the availableWidth up to the max container width
						const maxWidth = Math.min( maxContainerWidth, availableWidth );
						Object.assign( elements.floating.style, {
							width: `${ Math.max( minContainerWidth, maxWidth ) }px`,
							maxHeight: `${ Math.min(
								maxContainerHeight,
								Math.max( minContainerHeight, availableHeight )
							) }px`
						} );
					}
				} )
			],
			whileElementsMounted: autoUpdate
		} );

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

		// All languages excluding suggested ones
		const allLanguages = computed( () => {
			const suggestedValues = props.suggestedLanguages.map( ( lang ) => lang.value );
			return props.menuItems.filter( ( lang ) => !suggestedValues.includes( lang.value ) );
		} );

		// Event handlers
		function onButtonClick(): void {
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

		/**
		 * Close the container by collapsing it.
		 */
		function close(): void {
			expanded.value = false;
		}

		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-language-selector-close-button-label',
			'Close'
		);

		// Determine where to teleport the container to.
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

		// Close on Escape key (inspired by Popover)
		function handleKeydown( event: KeyboardEvent ): void {
			if ( event.key === 'Escape' && expanded.value ) {
				expanded.value = false;
			}
		}

		// Close on click outside (inspired by Popover)
		function handleClickOutside( event: MouseEvent ): void {
			// Access $el property directly from component instance
			const buttonEl = buttonWrapper.value ?
				( buttonWrapper.value as ComponentPublicInstance ).$el as
					HTMLElement | null | undefined :
				null;
			if (
				expanded.value &&
				floatingContainer.value &&
				buttonEl &&
				!floatingContainer.value.contains( event.target as Node ) &&
				!buttonEl.contains( event.target as Node )
			) {
				expanded.value = false;
			}
		}

		// Check if we're on mobile (tablet breakpoint is 640px)
		const TABLET_BREAKPOINT = 640;
		function isMobileViewport(): boolean {
			return window.innerWidth <= TABLET_BREAKPOINT;
		}

		// Prevent body scrolling when fullscreen container is open on mobile
		function updateBodyScrollLock(): void {
			if ( expanded.value && isMobileViewport() ) {
				// Add class to prevent body scrolling
				document.body.classList.add( 'cdx-language-selector-open' );
			} else {
				// Remove class to restore body scrolling
				document.body.classList.remove( 'cdx-language-selector-open' );
			}
		}

		// Setup and cleanup event listeners (inspired by Popover)
		watch( expanded, ( isExpanded ) => {
			if ( isExpanded ) {
				document.addEventListener( 'keydown', handleKeydown );
				document.addEventListener( 'mousedown', handleClickOutside );
			} else {
				document.removeEventListener( 'keydown', handleKeydown );
				document.removeEventListener( 'mousedown', handleClickOutside );
			}
			// Update body scroll lock when expanded state changes
			updateBodyScrollLock();
		} );

		// Handle window resize to update scroll lock if needed
		function handleResize(): void {
			updateBodyScrollLock();
		}

		onMounted( () => {
			updateBodyScrollLock();
			window.addEventListener( 'resize', handleResize );
		} );

		onUnmounted( () => {
			document.removeEventListener( 'keydown', handleKeydown );
			document.removeEventListener( 'mousedown', handleClickOutside );
			window.removeEventListener( 'resize', handleResize );
			// Clean up body class on unmount
			document.body.classList.remove( 'cdx-language-selector-open' );
		} );

		return {
			buttonWrapper,
			inputWrapper,
			input,
			floatingContainer,
			expanded,
			searchQuery,
			computedDisabled,
			inputValue,
			selectedLanguageLabel,
			filteredLanguages,
			allLanguages,
			modelWrapper,
			onButtonClick,
			onMainInput,
			onMainChange,
			onInputKeydown,
			onInputFocus,
			onInputBlur,
			selectLanguage,
			close,
			translatedCloseButtonLabel,
			computedTarget,
			floatingStyles,
			cdxIconExpand,
			cdxIconSearch,
			cdxIconClose,
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

	// Floating container (positioned by Floating UI)
	&__container {
		z-index: @z-index-popover;
		background-color: @background-color-base;
		display: flex;
		flex-direction: column;
		border: @border-base;
		border-radius: @border-radius-base;
		box-shadow: @box-shadow-medium;
		overflow: hidden;

		// Mobile responsive - full screen
		@media ( max-width: @min-width-breakpoint-tablet ) {
			// Full screen on mobile
			position: fixed !important;
			left: 0 !important;
			right: 0 !important;
			top: 0 !important;
			bottom: 0 !important;
			width: 100vw !important;
			height: 100vh !important;
			max-width: 100vw !important;
			max-height: 100vh !important;
			border-radius: 0 !important;
			transform: unset !important;
		}
	}

	&__header {
		display: flex;
		align-items: flex-start;
		flex-shrink: 0;
		justify-content: flex-end;
		padding: @spacing-50 @spacing-50 0 0;

		&__button-wrapper {
			// Vertically center the button within the wrapper `<div>` element.
			display: flex;
			flex-direction: column;
			justify-content: center;
			// Setting the height of the button wrapper to the line-height of the
			// accompanying text to ensure centering of the button to text
			height: @line-height-small;
			// Move the button over so the edge of the icon aligns with the edge of the content.
			// This makes the quiet button seem to take up less space.
			margin-right: -@spacing-50;
		}
	}

	&__section-header {
		font-size: @font-size-small;
		font-weight: @font-weight-semi-bold;
		color: @color-subtle;
		margin: @spacing-100 0 @spacing-75 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;

		&:first-child {
			margin-top: 0;
		}
	}

	&__languages {
		flex-grow: 1;
		flex-shrink: 1;
		max-height: inherit;
		overflow-y: auto;
		padding: @spacing-100;
	}

	&__language-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: @spacing-75 @spacing-100;
		border: 0;
		background: none;
		color: @color-base;
		font-size: @font-size-medium;
		cursor: pointer;
		transition: background-color @transition-duration-base ease;
		text-align: start;

		&:hover {
			background-color: @background-color-progressive-subtle;
		}

		&--selected {
			background-color: @background-color-progressive;
			color: @color-inverted;
		}

		// Mobile: larger touch targets
		@media ( max-width: @max-width-breakpoint-mobile ) {
			padding: @spacing-100 @spacing-150;
			font-size: @font-size-large;
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

// Prevent body scrolling when fullscreen container is open on mobile
body.cdx-language-selector-open {
	overflow: hidden;
}
</style>
