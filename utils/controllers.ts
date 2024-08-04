import type { ModalOptions, PopoverOptions } from '@ionic/core';
import {
	modalController as modalControllerOrg,
	popoverController as popoverControllerOrg
} from '@ionic/core';

import type { SvelteComponent } from 'svelte';

/*
TODO - interface needs to translate SvelteComponent type into ComponentRef 
Now we have to do this:

const openModal = async (modalComponent: SvelteComponent, formData: {}) => {
    const popover = await modalController.create({
      component: modalComponent as unknown as ComponentRef, // ModalOptions does not eat SvelteComponent
      componentProps: {
        formData,
      },
    });

    popover.onDidDismiss().then((value) => {
      console.log("Dismissed the popover", value);
      if (value.role === "backdrop") console.log("Backdrop clicked");
    });

    await popover.present();
  };
*/

export const modalController = {
	create: (modalOptions: ModalOptions): Promise<HTMLIonModalElement> => {
		console.warn(
			'modalController broken - use inline modal - https://github.com/Tommertom/svelte-ionic-app/issues/77'
		);
		// needs to be typed to ModalOptions (Partial or so?)
		// @ts-ignore - issue with modalOptions.component not matching

		console.warn(
			'modalController fails - use inline modal instead - https://github.com/Tommertom/svelte-ionic-app/issues/77'
		);

		return Promise.resolve(
			modalController.__create(modalOptions.component, modalOptions)
		) as Promise<HTMLIonModalElement>;
	},
	__create: (component: new (...args: any) => SvelteComponent, modalOptions: ModalOptions) => {
		const divWrapper = document.createElement('div');
		const contentID = 'id' + Date.now();
		divWrapper.id = contentID;

		const modalWrapper = document.createElement('ion-modal') as HTMLIonModalElement;
		// console.log('ADDING CSS', modalOptions.cssClass);
		// this part is not working
		if (modalOptions.cssClass) {
			if (Array.isArray(modalOptions.cssClass)) {
				modalOptions.cssClass.forEach((cssClass) => {
					modalWrapper.classList.add(cssClass);
				});
			} else modalWrapper.classList.add(modalOptions.cssClass);
		}

		let modalContent = document.createElement('div');

		/* assign properties */
		Object.keys(modalOptions)
			.filter((key) => !['component', 'componentProps'].includes(key))
			.forEach((key) => {
				modalWrapper[key] = modalOptions[key];
			});

		divWrapper.appendChild(modalWrapper);
		modalWrapper.appendChild(modalContent);
		document.body.appendChild(divWrapper);

		const svelteComponent = new component({
			target: modalContent,
			props: modalOptions.componentProps
		});

		modalWrapper.onDidDismiss().then(() => {
			svelteComponent.$destroy();
			divWrapper.remove();
		});

		return modalWrapper;
	},

	dismiss: (data?: any, role?: string | undefined, id?: string | undefined) => {
		return modalControllerOrg.dismiss(data, role);
	},

	getTop: () => {
		return modalControllerOrg.getTop();
	}
};

export const popoverController = {
	create: (popoverOptions: PopoverOptions): Promise<HTMLIonPopoverElement> => {
		// @ts-ignore - issue with popoverOptions.component not matching
		return Promise.resolve(
			popoverController.__create(popoverOptions.component, popoverOptions)
		) as Promise<HTMLIonPopoverElement>;
	},

	__create: (component: new (...args: any) => SvelteComponent, popoverOptions: PopoverOptions) => {
		const divWrapper = document.createElement('div');
		const contentID = 'id' + Date.now();
		divWrapper.id = contentID;

		const popoverWrapper = document.createElement('ion-popover') as HTMLIonPopoverElement;

		// console.log('ADDING CSS', modalOptions.cssClass);
		// this part is not working
		if (popoverOptions.cssClass) {
			if (Array.isArray(popoverOptions.cssClass)) {
				popoverOptions.cssClass.forEach((cssClass) => {
					popoverWrapper.classList.add(cssClass);
				});
			} else popoverWrapper.classList.add(popoverOptions.cssClass);
		}

		let popoverContent = document.createElement('div');

		/* assign properties */
		Object.keys(popoverOptions)
			.filter((key) => !['component', 'componentProps'].includes(key))
			.forEach((key) => {
				popoverWrapper[key] = popoverOptions[key];
			});

		divWrapper.appendChild(popoverWrapper);
		popoverWrapper.appendChild(popoverContent);
		document.body.appendChild(divWrapper);

		const svelteComponent = new component({
			target: popoverContent,
			props: popoverOptions.componentProps
		});

		popoverWrapper.onDidDismiss().then(() => {
			svelteComponent.$destroy();
			divWrapper.remove();
		});

		return popoverWrapper;
	},
	dismiss: (data?: any, role?: string | undefined, id?: string | undefined) => {
		return popoverControllerOrg.dismiss(data, role);
	},
	getTop: () => {
		return popoverControllerOrg.getTop();
	}
};
