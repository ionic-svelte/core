<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { alertController, IonPage } from 'ionic-svelte';

	import { superForm, defaults, setMessage, setError } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	const userSchema = z.object({
		firstName: z.string().min(2).default(''),
		lastName: z.string().min(2).default('')
	});

	const { form, errors, message, constraints, enhance, delayed, validate } = superForm(
		defaults(zod(userSchema)),
		{
			SPA: true,
			validators: zod(userSchema),
			onUpdate(form) {
				console.log('SUBMIT clicked, received form', form);
			},
			onError({ result }) {
				console.log('ERROR received', result, message);
				message.set(result.error.message);
			},
			validationMethod: 'oninput'
		}
	);

	function submit() {
		if (!$errors) {
			const controller = alertController
				.create({
					header: 'Account Created',
					message: `Created account for: <b>${$form.firstName} ${$form.firstName}</b>`,
					buttons: [
						{
							text: 'OK'
						}
					]
				})
				.then((alert) => alert.present());
		}

		if ($errors) {
			const controller = alertController
				.create({
					header: 'Account Not Created',
					message: `There were some errors - see console.log`,
					buttons: [
						{
							text: 'OK'
						}
					]
				})
				.then((alert) => alert.present());
		}
	}

	async function checkInput(e: any) {
		console.log('Getting stuff', e.detail.value, e.target.name);
		if (e.target.name in $form) {
			//@ts-ignore
			$form[e.target.name] = e.detail.value;
		}
		const nameErrors = await validate('firstName', { update: false });
		console.log('validate errors', nameErrors);
	}
</script>

<svelte:head>
	<title>Ionic Companion - Inputs - with Form Actions and zod</title>
</svelte:head>

<IonPage>
	<ion-content fullscreen class="ion-padding">
		<form method="POST" use:enhance>
			<ion-header translucent={true}>
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-button />
					</ion-buttons>
					<ion-buttons slot="end">
						<SourceButton name="Inputs" />
					</ion-buttons>
					<ion-title>Create Account</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-list lines="full" class="ion-no-margin ion-no-padding">
				<ion-item>
					<ion-input
						placeholder="Start typing here to see superforms"
						class:ion-invalid={$errors.firstName}
						class:ion-touched={$errors.firstName}
						label="First Name - Superforms supercharged"
						label-placement="stacked"
						helper-text="Here you may enter your first name - or something else"
						error-text="Please type more characters..."
						name="firstName"
						type="text"
						value={$form.firstName ?? ''}
						on:ionInput={checkInput} />
				</ion-item>

				<ion-item>
					<ion-input
						placeholder="Start typing here to see superforms"
						class:ion-invalid={$errors.lastName}
						class:ion-touched={$errors.lastName}
						label="Last Name - Superforms supercharged"
						label-placement="stacked"
						helper-text="Here you may enter your last name - or something else"
						error-text="Please type more characters..."
						name="lastName"
						type="text"
						value={$form.lastName ?? ''}
						on:ionInput={checkInput} />
				</ion-item>

				<ion-item>
					<ion-input label="Title" label-placement="floating" name="title" />
				</ion-item>

				<ion-item>
					<ion-label position="stacked">Address</ion-label>
					<ion-input aria-label="Address Line 2" placeholder="Address Line 1" name="addressLine1" />
					<ion-input aria-label="Address Line 2" placeholder="Address Line 2" name="addressLine2" />
					<ion-input aria-label="City" placeholder="City" name="city" />
					<ion-input aria-label="State" placeholder="State" name="state" />
					<ion-input aria-label="Zip Code" placeholder="Zip Code" name="zip" />
				</ion-item>

				<ion-item>
					<ion-textarea label-placement="stacked" label="Notes" name="notes" />
				</ion-item>
			</ion-list>

			<div class="ion-padding">
				<ion-button expand="block" type="submit" class="ion-no-margin"> Create account </ion-button>
			</div>
		</form>
	</ion-content>
</IonPage>
