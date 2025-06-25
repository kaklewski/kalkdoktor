import ROUTES from '../data/routes'

export function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const myForm = event.target
  const formData = new FormData(myForm as HTMLFormElement)

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData as any).toString(),
  })
    .then(() => window.location.replace(ROUTES.SUCCESS))
    .catch(error => alert(error))
}
