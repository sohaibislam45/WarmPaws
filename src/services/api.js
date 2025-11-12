export async function fetchServices() {
  const r = await fetch("/data.json");
  if (!r.ok) throw new Error("Failed to fetch services");
  const data = await r.json();
  return Array.isArray(data) ? data : [data];
}

export async function fetchServiceById(id) {
  const list = await fetchServices();
  return list.find((s) => String(s.serviceId) === String(id)) || null;
}
