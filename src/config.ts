export const apiUrl = "https://mighty-refuge-88074.herokuapp.com/";

export const vkAuth = {
  url: "https://oauth.vk.com/",
  redirect_uri: "http://inlists.ru/authme",
  client_id: "7719105",
};

export const features = {
  search: process.env.NODE_ENV === "development",
  especial: process.env.NODE_ENV === "development",
  main_promo: true,
};
