export const formaterPhoneNumber = (value: string) => {
  return value.slice(3, 18)
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4')
}