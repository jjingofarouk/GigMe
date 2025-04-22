export const validateFreelancerForm = (data: {
  name: string;
  blurb: string;
  bestThings: string[];
  location: string;
  contact: string;
  latitude: number;
  longitude: number;
}) => {
  const errors: string[] = [];
  if (!data.name.trim()) errors.push('Name is required');
  if (!data.blurb.trim()) errors.push('Blurb is required');
  if (data.bestThings.length !== 3 || data.bestThings.some((thing) => !thing.trim()))
    errors.push('Exactly three best things are required');
  if (!data.location.trim()) errors.push('Location is required');
  if (!data.contact.trim()) errors.push('Contact is required');
  if (isNaN(data.latitude) || data.latitude < -90 || data.latitude > 90)
    errors.push('Valid latitude is required');
  if (isNaN(data.longitude) || data.longitude < -180 || data.longitude > 180)
    errors.push('Valid longitude is required');
  return errors;
};