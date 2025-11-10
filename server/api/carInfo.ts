export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { make, model, year } = query;
  const config = useRuntimeConfig();

  const url = `${config.carDataUrl}?cmd=getTrims&make=${make}&year=${year}&model=${model}`;

  const response = await fetch(url);
  let text = await response.text();
  const data = JSON.parse(text);

  return data;
});
