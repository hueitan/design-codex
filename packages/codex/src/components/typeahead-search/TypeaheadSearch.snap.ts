// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TypeaheadSearch initial state Case 0 Default: ({"formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "useButton": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 1 With \`autoExpandWidth\` true and \`showThumbnail\` true: ({"autoExpandWidth": true, "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "showThumbnail": true, "useButton": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 2 With \`autoExpandWidth\` true and \`showThumbnail\` false: ({"autoExpandWidth": true, "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "showThumbnail": false, "useButton": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 3 With custom visible button label: ({"buttonLabel": "Search Results", "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "useButton": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search Results
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch initial state Case 4 With custom visible button label using the deprecated API: ({"autoExpandWidth": true, "buttonLabel": "Search", "formAction": "/w/index.php", "id": "foo", "placeholder": "Search Wikipedia", "searchResults": [Array], "showThumbnail": true}) => HTML 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch, with no results matches the snapshot 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input cdx-text-input__input--has-value"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-menu--has-footer cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <li
              class="cdx-menu__no-results cdx-menu-item"
              role="option"
            >
              <!-- @slot Message to show if there are no menu items to display. -->
              
              <div
                class="cdx-menu-item__content cdx-typeahead-search__menu-message cdx-typeahead-search__menu-message--has-thumbnail"
              >
                <span
                  class="cdx-typeahead-search__menu-message__text"
                >
                  <!--
									@slot A slot for passing in a translated "no results" message.
								-->
                  
                  No results found
                  
                </span>
              </div>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="v-1-2"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              
              <a
                class="cdx-menu-item__content cdx-typeahead-search__search-footer"
                href="https://foo.org/search?query=Co"
              >
                <!-- eslint-disable max-len -->
                <span
                  class="cdx-icon cdx-icon--medium cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!--v-if-->
                    <!-- eslint-disable vue/no-v-html -->
                    <g>
                      <path
                        d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="3"
                      />
                    </g>
                  </svg>
                </span>
                <span
                  class="cdx-menu-item__text cdx-typeahead-search__search-footer__text"
                >
                  <!-- eslint-enable max-len -->
                  <!--
									@slot A slot for passing in translated search footer text.
									@binding {string} search-query Input text entered by the user
								-->
                  
                  <strong
                    class="cdx-typeahead-search__search-footer__query"
                  >
                    Co
                  </strong>
                  
                </span>
              </a>
              
              
            </li>
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;

exports[`TypeaheadSearch, with search results matches the snapshot 1`] = `
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail"
>
  <form
    action="/w/index.php"
    class="cdx-typeahead-search__form"
    id="foo"
  >
    <div
      class="cdx-search-input cdx-search-input--has-end-button cdx-typeahead-search__input"
    >
      <div
        class="cdx-search-input__input-wrapper"
      >
        <div
          class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--status-default cdx-search-input__text-input"
        >
          <!-- size="1" is to prevent the browser from setting an implicit min-width -->
          <input
            aria-autocomplete="list"
            aria-controls="v-0"
            aria-expanded="false"
            autocomplete="off"
            class="cdx-text-input__input cdx-text-input__input--has-value"
            name="search"
            placeholder="Search Wikipedia"
            role="combobox"
            size="1"
            type="search"
          />
          <span
            class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__start-icon"
          >
            <svg
              aria-hidden="true"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!--v-if-->
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"
                />
              </g>
            </svg>
          </span>
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
        
        <div
          class="cdx-menu cdx-menu--has-footer cdx-typeahead-search__menu"
          style="display: none;"
        >
          <ul
            aria-label="Search results"
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="v-1-2"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <a
                class="cdx-menu-item__content"
                href="https://en.wikipedia.org/wiki/CO"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <span
                  class="cdx-thumbnail cdx-menu-item__thumbnail"
                >
                  <span
                    class="cdx-thumbnail__placeholder"
                  >
                    <span
                      class="cdx-icon cdx-icon--medium cdx-thumbnail__placeholder__icon--vue"
                    >
                      <svg
                        aria-hidden="true"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!--v-if-->
                        <!-- eslint-disable vue/no-v-html -->
                        <g>
                          <path
                            d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
                          />
                          <path
                            d="M19 5H1V3h18zm0 12H1v-2h18z"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                  <transition-stub
                    appear="false"
                    css="true"
                    name="cdx-thumbnail__image"
                    persisted="false"
                  >
                    <!--v-if-->
                  </transition-stub>
                </span>
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      Co
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </a>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--has-description cdx-menu-item--hide-description-overflow"
              id="v-1-3"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <a
                class="cdx-menu-item__content"
                href="https://en.wikipedia.org/wiki/Color"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <span
                  class="cdx-thumbnail cdx-menu-item__thumbnail"
                >
                  <span
                    class="cdx-thumbnail__placeholder"
                  >
                    <span
                      class="cdx-icon cdx-icon--medium cdx-thumbnail__placeholder__icon--vue"
                    >
                      <svg
                        aria-hidden="true"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!--v-if-->
                        <!-- eslint-disable vue/no-v-html -->
                        <g>
                          <path
                            d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
                          />
                          <path
                            d="M19 5H1V3h18zm0 12H1v-2h18z"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                  <transition-stub
                    appear="false"
                    css="true"
                    name="cdx-thumbnail__image"
                    persisted="false"
                  >
                    <!--v-if-->
                  </transition-stub>
                </span>
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      Color
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <span
                    class="cdx-menu-item__text__description"
                  >
                    <bdi>
                      visual perception of light wavelengths
                    </bdi>
                  </span>
                </span>
                <!--v-if-->
              </a>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--bold-label cdx-menu-item--hide-description-overflow"
              id="v-1-4"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              
              <a
                class="cdx-menu-item__content cdx-typeahead-search__search-footer"
                href="https://foo.org/search?query=Co"
              >
                <!-- eslint-disable max-len -->
                <span
                  class="cdx-icon cdx-icon--medium cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!--v-if-->
                    <!-- eslint-disable vue/no-v-html -->
                    <g>
                      <path
                        d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="3"
                      />
                    </g>
                  </svg>
                </span>
                <span
                  class="cdx-menu-item__text cdx-typeahead-search__search-footer__text"
                >
                  <!-- eslint-enable max-len -->
                  <!--
									@slot A slot for passing in translated search footer text.
									@binding {string} search-query Input text entered by the user
								-->
                  
                  <strong
                    class="cdx-typeahead-search__search-footer__query"
                  >
                    Co
                  </strong>
                  
                </span>
              </a>
              
              
            </li>
            
            
            <!--v-if-->
          </ul>
        </div>
        
      </div>
      <button
        class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-search-input__end-button"
      >
        <!-- @slot Button content -->
        
        Search
        
      </button>
    </div>
    <!--
				@slot A slot for passing hidden inputs, i.e.
				\`&lt;input type="hidden" name="language" value="en"&gt;\`
			-->
    
    
    <input
      name="title"
      type="hidden"
      value="Special:Search"
    />
    
    
  </form>
</div>
`;
