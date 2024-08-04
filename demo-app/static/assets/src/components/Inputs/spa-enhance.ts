/* eslint-disable @typescript-eslint/ban-ts-comment */

import { writable, type Writable } from 'svelte/store';

// https://zod.dev/
// https://morioh.com/p/cc9d89e8a10b
import type { ZodTypeAny } from 'zod';

interface ErrorObject {
	[key: string]: string[];
}
export interface FormType {
	success?: boolean;
	errors?: ErrorObject;
	data: { [key: string]: string };
	validate?: () => void;
}

export function getFormWritable() {
	return writable<FormType | null>(null);
}

let current_form_node: HTMLFormElement;
let current_schema: ZodTypeAny | undefined;
let current_writable_form: Writable<FormType | null>;
let current_validate_function: any;

function formToObject(node_id: number | string) {
	//@ts-ignore
	const form = document.forms[node_id];
	const formData = new FormData(form);
	const keys = Array.from(formData.keys());

	const output: { [key: string]: string } = {};
	keys.forEach((key) => {
		output[key] = formData.get(key) as string;
	});

	return output;
}

//@ts-ignore
export function validateField(ev) {
	const name = ev.target.name;
	const value = ev.detail.value;

	if (name && value && current_form_node && current_schema) {
		const data = formToObject(current_form_node.id);

		const result = current_schema.safeParse(data);

		if (!result.success) {
			const errors = result.error.errors
				.filter((error) => error.path[0] === name)
				.map((error) => error.message);

			// we update errors for this field when there was an error
			if (errors.length > 0) {
				current_writable_form.update((formStatus: FormType | null) => {
					const newStatus = formStatus ?? {
						success: false,
						errors: undefined,
						data: {},
						validate: undefined
					};

					if (!newStatus.errors) newStatus.errors = {};
					//@ts-ignore
					newStatus.errors[name] = errors;
					//@ts-ignore
					newStatus.data[name] = value;
					newStatus.success = false;
					newStatus.validate = current_validate_function;

					return newStatus;
				});
			}

			// we update to ok when there was no error for this field
			if (errors.length === 0) {
				current_writable_form.update((formStatus: FormType | null) => {
					const newStatus = formStatus ?? {
						success: false,
						errors: undefined,
						data: {},
						validate: undefined
					};

					// let's remove any earlier errors related to this field
					if (!newStatus.errors) newStatus.errors = {};

					delete newStatus.errors[name];

					// we copy formstatus success state
					if (formStatus?.success) newStatus.success = formStatus.success;
					// but if there is no error, we put it to true
					if (Object.keys(newStatus.errors).length === 0) newStatus.success = true;

					newStatus.data[name] = value;
					newStatus.validate = current_validate_function;

					return newStatus;
				});
			}
		}

		// if there was nothing wrong, we make sure the form success state reset to initial success
		if (result.success) current_validate_function();
	}
}

export function enhance(
	formNode: HTMLFormElement,
	params: { form: Writable<FormType | null>; schema?: ZodTypeAny }
) {
	const { form, schema } = params;

	current_form_node = formNode;
	current_schema = schema;
	current_writable_form = form;
	current_validate_function = validateForm;

	function validateForm() {
		let success = false;
		let errors: undefined | ErrorObject = undefined;
		let data = formToObject(formNode.id);

		if (schema) {
			const result = schema.safeParse(data);
			success = result.success;

			// add errros
			if (!result.success) {
				const errorsArray = result.error.errors.map((error) => {
					return {
						field: error.path[0],
						message: error.message
					};
				});

				// transform in object with list of arrays
				errors = errorsArray.reduce((acc, obj) => {
					//@ts-ignore
					if (!acc[obj.field]) {
						//@ts-ignore
						acc[obj.field] = [];
					}
					//@ts-ignore
					acc[obj.field].push(obj.message);
					return acc;
				}, {});
			}

			if (result.success) data = result.data;
		}

		form.set({
			success,
			errors,
			data,
			validate: validateForm
		});
	}

	const submitHandler = (event: SubmitEvent) => {
		event.preventDefault();
		validateForm();
	};

	formNode.addEventListener('submit', submitHandler);
	return {
		destroy() {
			formNode.removeEventListener('submit', submitHandler);
		}
	};
}
