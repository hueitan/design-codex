<template>
	<section id="cdx-language-selector" class="cdx-demo-section">
		<h2>Language Selector</h2>
		<p>
			language selector component
		</p>

		<div class="cdx-demo-section__example">
			<h3>Language Selector</h3>
			<p>Click to open and search through languages:</p>
			<cdx-language-selector
				v-model:selected="selectedLanguage"
				:menu-items="allLanguages"
				:suggested-languages="suggestedLanguages"
				:use-close-button="true"
				@update:selected="onLanguageChange"
			/>
			<p>
				<strong>Selected:</strong> {{ selectedLanguage }}
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxLanguageSelector } from '../lib';

const selectedLanguage = ref( '' );

const suggestedLanguages = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'ru', label: 'русский' },
	{ value: 'ko', label: '한국어' }
];

const allLanguages = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Spanish' },
	{ value: 'fr', label: 'French' },
	{ value: 'de', label: 'German' },
	{ value: 'it', label: 'Italian' },
	{ value: 'pt', label: 'Portuguese' },
	{ value: 'ru', label: 'Russian' },
	{ value: 'ja', label: 'Japanese' },
	{ value: 'ko', label: 'Korean' },
	{ value: 'zh', label: 'Chinese' },
	{ value: 'ar', label: 'Arabic' },
	{ value: 'hi', label: 'Hindi' },
	{ value: 'nl', label: 'Dutch' },
	{ value: 'sv', label: 'Swedish' },
	{ value: 'no', label: 'Norwegian' },
	{ value: 'da', label: 'Danish' },
	{ value: 'fi', label: 'Finnish' },
	{ value: 'pl', label: 'Polish' },
	{ value: 'tr', label: 'Turkish' },
	{ value: 'he', label: 'Hebrew' },
	{ value: 'th', label: 'Thai' },
	{ value: 'vi', label: 'Vietnamese' },
	{ value: 'id', label: 'Indonesian' },
	{ value: 'ms', label: 'Malay' },
	{ value: 'tl', label: 'Filipino' },
	{ value: 'uk', label: 'Ukrainian' },
	{ value: 'cs', label: 'Czech' },
	{ value: 'hu', label: 'Hungarian' },
	{ value: 'ro', label: 'Romanian' },
	{ value: 'bg', label: 'Bulgarian' },
	{ value: 'hr', label: 'Croatian' },
	{ value: 'sk', label: 'Slovak' },
	{ value: 'sl', label: 'Slovenian' },
	{ value: 'et', label: 'Estonian' },
	{ value: 'lv', label: 'Latvian' },
	{ value: 'lt', label: 'Lithuanian' },
	{ value: 'el', label: 'Greek' },
	{ value: 'ca', label: 'Catalan' },
	{ value: 'eu', label: 'Basque' },
	{ value: 'ga', label: 'Irish' },
	{ value: 'cy', label: 'Welsh' },
	{ value: 'mt', label: 'Maltese' },
	{ value: 'is', label: 'Icelandic' },
	{ value: 'fo', label: 'Faroese' },
	{ value: 'mk', label: 'Macedonian' },
	{ value: 'sq', label: 'Albanian' },
	{ value: 'sr', label: 'Serbian' },
	{ value: 'bs', label: 'Bosnian' },
	{ value: 'me', label: 'Montenegrin' },
	{ value: 'fa', label: 'Persian' },
	{ value: 'ur', label: 'Urdu' },
	{ value: 'bn', label: 'Bengali' },
	{ value: 'ta', label: 'Tamil' },
	{ value: 'te', label: 'Telugu' },
	{ value: 'ml', label: 'Malayalam' },
	{ value: 'kn', label: 'Kannada' },
	{ value: 'gu', label: 'Gujarati' },
	{ value: 'pa', label: 'Punjabi' },
	{ value: 'or', label: 'Odia' },
	{ value: 'as', label: 'Assamese' },
	{ value: 'ne', label: 'Nepali' },
	{ value: 'si', label: 'Sinhala' },
	{ value: 'my', label: 'Burmese' },
	{ value: 'km', label: 'Khmer' },
	{ value: 'lo', label: 'Lao' },
	{ value: 'ka', label: 'Georgian' },
	{ value: 'am', label: 'Amharic' },
	{ value: 'sw', label: 'Swahili' },
	{ value: 'zu', label: 'Zulu' },
	{ value: 'af', label: 'Afrikaans' },
	{ value: 'xh', label: 'Xhosa' },
	{ value: 'yo', label: 'Yoruba' },
	{ value: 'ig', label: 'Igbo' },
	{ value: 'ha', label: 'Hausa' },
	{ value: 'so', label: 'Somali' },
	{ value: 'om', label: 'Oromo' },
	{ value: 'ti', label: 'Tigrinya' },
	{ value: 'rw', label: 'Kinyarwanda' },
	{ value: 'rn', label: 'Kirundi' },
	{ value: 'mg', label: 'Malagasy' },
	{ value: 'ny', label: 'Chichewa' },
	{ value: 'sn', label: 'Shona' },
	{ value: 'st', label: 'Sesotho' },
	{ value: 'tn', label: 'Setswana' },
	{ value: 'ss', label: 'Siswati' },
	{ value: 've', label: 'Venda' },
	{ value: 'ts', label: 'Tsonga' },
	{ value: 'nr', label: 'Ndebele' }
];

function onLanguageChange( value: string ) {
	// eslint-disable-next-line no-console
	console.log( 'Language changed to:', value );
}

</script>

<style lang="less" scoped>
.custom-menu-item {
	padding: 8px 0;
}

.language-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 4px;
}

.language-name {
	font-weight: 500;
	color: #333;
}

.language-code {
	font-size: 12px;
	color: #666;
	background: #f0f0f0;
	padding: 2px 6px;
	border-radius: 3px;
}

.language-description {
	font-size: 12px;
	color: #888;
	font-style: italic;
}
</style>
