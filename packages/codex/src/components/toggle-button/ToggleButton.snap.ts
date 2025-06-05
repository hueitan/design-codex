// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`ToggleButton matches the snapshot Case 0 Default: ({"disabled": false, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 1 Active: ({"disabled": false, "modelValue": true, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-on"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 2 Disabled, inactive: ({"disabled": true, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off"
  disabled=""
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 3 Disabled, active: ({"disabled": true, "modelValue": true, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-on"
  disabled=""
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 4 Quiet: ({"disabled": false, "modelValue": false, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-off"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 5 Quiet, active: ({"disabled": false, "modelValue": true, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-on"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 6 Quiet, disabled, inactive: ({"disabled": true, "modelValue": false, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-off"
  disabled=""
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 7 Quiet, disabled, active: ({"disabled": true, "modelValue": true, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-on"
  disabled=""
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  Button text
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 8 Icon-only (SVG): ({"disabled": false, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-label="Icon-only example"
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off cdx-toggle-button--icon-only"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  <svg />
  
</button>
`;

exports[`ToggleButton matches the snapshot Case 9 Icon-only (CdxIcon): ({"disabled": false, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-hidden="true"
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off cdx-toggle-button--icon-only"
  type="button"
>
  <!-- @slot ToggleButton content -->
  
  <cdx-icon-stub
    icon="<path d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z"/>"
    iconlabel=""
    size="medium"
  />
  
</button>
`;
