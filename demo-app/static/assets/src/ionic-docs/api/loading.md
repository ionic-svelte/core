---
title: 'ion-loading'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Props from '@site/static/auto-generated/loading/props.md';
import Events from '@site/static/auto-generated/loading/events.md';
import Methods from '@site/static/auto-generated/loading/methods.md';
import Parts from '@site/static/auto-generated/loading/parts.md';
import CustomProps from '@site/static/auto-generated/loading/custom-props.md';
import Slots from '@site/static/auto-generated/loading/slots.md';

<head>
  <title>Loading | Application Loading Indicator Overlay | ion-loading</title>
  <meta name="description" content="The ion-loading overlay indicates activity while blocking user interaction. The loading indicator appears on top of the app's content, and can be dismissed." />
</head>

import EncapsulationPill from '@components/page/api/EncapsulationPill';
import APITOCInline from '@components/page/api/APITOCInline';

<EncapsulationPill type="scoped" />

An overlay that can be used to indicate activity while blocking user interaction. The loading indicator appears on top of the app's content, and can be dismissed by the app to resume user interaction with the app. It includes an optional backdrop, which can be disabled by setting `showBackdrop: false` upon creation.

## Basic Usage

Once presented, the loading indicator will display indefinitely by default. Developers can manually dismiss the loading indicator after creation by calling the `dismiss()` method on the component. The `onDidDismiss` function can be called to perform an action after the loading indicator is dismissed.

Alternatively, developers can configure the loading indicator to dismiss automatically after a specific amount of time by passing the number of milliseconds to display it in the `duration` of the loading options.

### Controller

import Controller from '@site/static/usage/loading/controller/index.md';

<Controller />

### Inline

Ionic React and Ionic Vue users also have the option to use the `ion-loading` component directly in their template.

<Tabs defaultValue="react" values={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]}>
<TabItem value="react">

```tsx
import React, { useState } from 'react';
import { IonLoading, IonButton, IonContent } from '@ionic/react';

export const LoadingExample: React.FC = () => {
	const [showLoading, setShowLoading] = useState(false);

	return (
		<IonContent>
			<IonButton onClick={() => setShowLoading(true)}>Show Loading</IonButton>
			<IonLoading
				cssClass="my-custom-class"
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Please wait...'}
				duration={5000}
			/>
		</IonContent>
	);
};
```

</TabItem>
<TabItem value="vue">

```html
<template>
	<ion-content>
		<ion-button @click="setOpen(true)">Show Loading</ion-button>
		<ion-loading
			:is-open="isOpenRef"
			cssClass="my-custom-class"
			message="Please wait..."
			:duration="timeout"
			@didDismiss="setOpen(false)">
		</ion-loading>
	</ion-content>
</template>

<script lang="ts">
	import { IonButton, IonContent, IonLoading } from '@ionic/vue';
	import { defineComponent, ref } from 'vue';
	export default defineComponent({
		props: {
			timeout: { type: Number, default: 1000 }
		},
		components: { IonButton, IonContent, IonLoading },
		setup() {
			const isOpenRef = ref(false);
			const setOpen = (state: boolean) => (isOpenRef.value = state);

			return { isOpenRef, setOpen };
		}
	});
</script>
```

</TabItem>
</Tabs>

## Customization

### Spinners

The spinner that is used can be customized using the `spinner` property. See the [spinner property documentation](#spinner) for a full list of options.

import Spinners from '@site/static/usage/loading/spinners/index.md';

<Spinners />

### Theming

Loading uses scoped encapsulation, which means it will automatically scope its CSS by appending each of the styles with an additional class at runtime. Overriding scoped selectors in CSS requires a [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selector.

We recommend passing a custom class and using that to add custom styles to the host and inner elements.

import Theming from '@site/static/usage/loading/theming/index.md';

<Theming />

:::note
`ion-loading` is presented at the root of your application, so we recommend placing any `ion-loading` styles in a global stylesheet.
:::

## Interfaces

### LoadingOptions

```typescript
interface LoadingOptions {
	spinner?: SpinnerTypes | null;
	message?: string | IonicSafeString;
	cssClass?: string | string[];
	showBackdrop?: boolean;
	duration?: number;
	translucent?: boolean;
	animated?: boolean;
	backdropDismiss?: boolean;
	mode?: Mode;
	keyboardClose?: boolean;
	id?: string;
	htmlAttributes?: { [key: string]: any };

	enterAnimation?: AnimationBuilder;
	leaveAnimation?: AnimationBuilder;
}
```

<Props />
<Events />
<Methods />
<Parts />
<CustomProps />
<Slots />
