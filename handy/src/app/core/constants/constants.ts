export const apiURL = 'https://handy-utn-backend-815e66e9002b.herokuapp.com/api';
//export const apiURL = 'http://localhost:8080/api';


export const postURL = apiURL + '/post'
export const filteredPostsURL = postURL + '/filteredPosts'
export const photoURL = apiURL + '/photo'
export const userURL = apiURL + '/user'
export const mercadoPagoURL = apiURL + '/mercadoPago/create-payment'
export const ualaBisURL = apiURL + '/uala/createOrder'
export const addressURL = apiURL + '/address'
export const geoNamesURL = apiURL + '/geonames'
export const getProvincesURL = geoNamesURL + '/provinces'
export const getLocationsURL = geoNamesURL + '/locations'
export const categoryURL = apiURL + '/category'
export const authURL = apiURL + '/auth'
export const loginURL = authURL + '/loginauth'
export const googleLoginURL = authURL + '/google_login'
export const logoutURL = authURL + '/logoutauth'
export const cartURL = apiURL + '/cart'
export const totalToPayPerCarttURL = apiURL + '/total_to_pay_per_cart'
export const totalToPayPerAuthorURL = apiURL + '/total_to_pay_per_author'
export const commentURL = apiURL + '/comment'
export const ratingURL = apiURL + '/rating'
export const postRatingURL = ratingURL + '/postRating'
export const userRatingURL = ratingURL + '/userRating'
export const messageURL = apiURL + '/message'
export const paymentMethodURL = apiURL + '/payment_method'
export const purchaseURL = apiURL + '/purchase'
export const brandURL = apiURL + '/brand'
export const mailURL = apiURL + '/email'
export const orderByTypeURL = apiURL + '/order_by_type'
export const updatePasswordURL = userURL + '/updatePassword'
export const checkpasswordsURL = userURL + '/checkpasswords'
export const checkIfUserAlreadyExistWithMail = userURL + '/checkIfUserAlreadyExistWithMail'
export const userAlreadyExistWithUsername = userURL + '/userAlreadyExistWithUsername'
export const ARURL = apiURL + '/augmented_reality'
export const chatGPTURL = apiURL + '/chat'


export const googleAccessTokenKey = 'google_access_token';
export const googleEmailKey = 'google_email';
export const googleFirstNameKey = 'google_first_name';
export const googleLastNameKey = 'google_last_name';
