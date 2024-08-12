export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const resourceName = (window as { GetParentResourceName?: () => string }).GetParentResourceName
    ? (window as { GetParentResourceName?: () => string }).GetParentResourceName!()
    : "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  const respFormatted = await resp.json();

  return respFormatted;
}