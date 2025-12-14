import { FormEvent } from 'react';

import ROUTES from '../data/routes';

export async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const plainFormData: Record<string, string> = {};
  formData.forEach((value, key) => {
    plainFormData[key] = value.toString();
  });

  try {
    const response = await fetch(ROUTES.HOME, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(plainFormData).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    window.location.replace(ROUTES.SUCCESS);
  } catch (error) {
    alert(error instanceof Error ? error.message : String(error));
  }
}
