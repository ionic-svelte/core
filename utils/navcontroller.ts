/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
	NavComponentWithProps,
	ComponentProps,
	NavComponent,
	NavOptions,
	TransitionDoneFn,
	ViewController
} from '@ionic/core';
import type { SvelteComponent } from 'svelte';

const createHTMLCompFromSvelte = (
	component: new (...args: any) => SvelteComponent,
	componentProps: { [key: string]: any } = {}
) => {
	const divWrapper = document.createElement('div');
	const contentID = 'id' + Date.now();
	divWrapper.id = contentID;

	const navContent = document.createElement('div');

	divWrapper.appendChild(navContent);
	document.body.appendChild(divWrapper);

	const props = {
		...componentProps
		// ionNav
	};

	const svelteComponent = new component({
		target: navContent,
		props
	});

	return divWrapper;
};

export const navController = {
	canGoBack: function (view?: ViewController) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.canGoBack(view) : undefined;
	},

	getActive: function () {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.getActive() : undefined;
	},

	getByIndex: function (index: number) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.getByIndex(index) : undefined;
	},

	getPrevious: function (view?: ViewController) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.getPrevious(view) : undefined;
	},

	insert: function <T extends NavComponent>(
		insertIndex: number,
		component: T,
		componentProps?: ComponentProps<T> | null,
		opts?: NavOptions | null,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		// eslint-disable @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const htmlcomponent = createHTMLCompFromSvelte(component, componentProps);
		return _nav !== undefined
			? _nav.insert(insertIndex, htmlcomponent, componentProps, opts, done)
			: undefined;
	},

	insertPages: function (
		insertIndex: number,
		insertComponents: NavComponent[] | NavComponentWithProps[],
		opts?: NavOptions | null,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		// eslint-disable @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const htmlcomponents: NavComponent[] | NavComponentWithProps[] = insertComponents.map(
			(component: NavComponent | NavComponentWithProps) => {
				//@ts-ignore
				return typeof component['component'] === 'undefined'
					? component
					: {
							//@ts-ignore
							component: createHTMLCompFromSvelte(
								component['component'],
								component['componentProps']
							),
							//@ts-ignore
							componentProps: component['componentProps']
						};
			}
		);
		return _nav !== undefined
			? _nav.insertPages(insertIndex, htmlcomponents, opts, done)
			: undefined;
	},

	pop: function (opts?: NavOptions | null, done?: TransitionDoneFn) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.pop(opts, done) : undefined;
	},

	popTo: function (
		indexOrViewCtrl: number | ViewController,
		opts?: NavOptions | null,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.popTo(indexOrViewCtrl, opts, done) : undefined;
	},

	popToRoot: function (opts?: NavOptions | null, done?: TransitionDoneFn) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.popToRoot(opts, done) : undefined;
	},

	push: function <T extends NavComponent>(
		component: T,
		componentProps?: ComponentProps<T>,
		opts?: NavOptions,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const htmlcomponent = createHTMLCompFromSvelte(component, componentProps);
		return _nav !== undefined ? _nav.push(htmlcomponent, componentProps, opts, done) : undefined;
	},

	removeIndex: function (
		startIndex: number,
		removeCount?: number,
		opts?: NavOptions | null,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		return _nav !== undefined ? _nav.removeIndex(startIndex, removeCount, opts, done) : undefined;
	},

	setPages: function (
		views: NavComponent[] | NavComponentWithProps[],
		opts?: NavOptions | null,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		// eslint-disable @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const htmlcomponents: NavComponent[] | NavComponentWithProps[] = views.map(
			(component: NavComponent | NavComponentWithProps) => {
				//@ts-ignore
				return typeof component['component'] === 'undefined'
					? component
					: {
							//@ts-ignore
							component: createHTMLCompFromSvelte(
								component['component'],
								component['componentProps']
							),
							//@ts-ignore
							componentProps: component['componentProps']
						};
			}
		);
		return _nav !== undefined ? _nav.setPages(htmlcomponents, opts, done) : undefined;
	},

	setRoot: function <T extends NavComponent>(
		component: T,
		componentProps?: ComponentProps<T>,
		opts?: NavOptions,
		done?: TransitionDoneFn
	) {
		const _nav = document.querySelector('ion-nav') as HTMLIonNavElement;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const htmlcomponent = createHTMLCompFromSvelte(component, componentProps);
		return _nav !== undefined ? _nav.setRoot(htmlcomponent, componentProps, opts, done) : undefined;
	}
};
