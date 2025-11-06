export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { make, model, year } = query;

  const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&year=${year}&model=${model}`;

  const response = await fetch(url);
  let text = await response.text();
  const data = JSON.parse(text);

  return data;
});
