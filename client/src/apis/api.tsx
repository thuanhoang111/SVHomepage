import axios from "./axios";

// Define an object to hold various API methods
const api = {
  /**
   * Fetches the list of partners with pagination and visibility options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @returns {Promise} - Axios GET request promise.
   */
  getPartnerList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<any> => {
    let url = `/partner?sortBy=createdAt&&orderBy=asc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of cooperatives with pagination and visibility options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @returns {Promise} - Axios GET request promise.
   */
  getCooperativeList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<any> => {
    let url = `/cooperative?sortBy=createdAt&&orderBy=asc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of contacts with pagination and default contact options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} defaultContact - Filter based on default contact status.
   * @returns {Promise} - Axios GET request promise.
   */
  getContactList: (
    page: number | null,
    limit: number | null,
    defaultContact: boolean | null
  ): Promise<any> => {
    let url = `/contact?sortBy=default&&orderBy=desc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (defaultContact) url += `&&default=${defaultContact}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of feedback with pagination and visibility options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @returns {Promise} - Axios GET request promise.
   */
  getFeedbackList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<any> => {
    let url = `/feedback?sortBy=createdAt&&orderBy=asc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },

  /**
   * Fetches all available years for news.
   *
   * @returns {Promise} - Axios GET request promise.
   */
  getAllYear: (): Promise<any> => {
    return axios.get("/news/year/all?sortBy=year&&orderBy=desc");
  },

  /**
   * Fetches the list of news with pagination, visibility, and year options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @param {string | null} year - Filter based on the year.
   * @returns {Promise} - Axios GET request promise.
   */
  getNewsList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    year: string | null
  ): Promise<any> => {
    let url = `/news?sortBy=day&&orderBy=desc`;
    if (year) url += `&&day[gte]=${year}/1/1&&day[lte]=${year}/12/31`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },

  /**
   * Fetches the detailed information of a specific news item.
   *
   * @param {string} id - The ID of the news item.
   * @returns {Promise} - Axios GET request promise.
   */
  getNewsDetail: (id: string): Promise<any> => {
    let url = `/news/detail/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the full detailed information of a specific news item.
   *
   * @param {string} id - The ID of the news item.
   * @returns {Promise} - Axios GET request promise.
   */
  getNewsDetailFull: (id: string): Promise<any> => {
    let url = `/news/detail-full/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the detailed information of a specific news item in a detailed view.
   *
   * @param {string} id - The ID of the news item.
   * @returns {Promise} - Axios GET request promise.
   */
  getNewsItemDetail: (id: string): Promise<any> => {
    let url = `/news/news-item/detail/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of tags with pagination, visibility, and language options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @param {string | null} vi - Filter based on Vietnamese language tag.
   * @param {string | null} jp - Filter based on Japanese language tag.
   * @returns {Promise} - Axios GET request promise.
   */
  getTagList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    vi: string | null,
    jp: string | null
  ): Promise<any> => {
    let url = "/agriculture/tag/full/all?sortBy=createdAt&&orderBy=desc";
    if (visible) url += `&&visible=${visible}`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (vi) url += `&&vi=${vi}`;
    if (jp) url += `&&jp=${jp}`;
    return axios.get(url);
  },

  /**
   * Fetches the detailed information of a specific tag.
   *
   * @param {string} id - The ID of the tag.
   * @returns {Promise} - Axios GET request promise.
   */
  getTagDetail: (id: string): Promise<any> => {
    let url = `/agriculture/tag/detail/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of agricultural items with pagination, visibility, tag, and language options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @param {string} tag - Filter based on tag.
   * @param {string} lang - Filter based on language.
   * @returns {Promise} - Axios GET request promise.
   */
  getAgricultureList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    tag: string | "",
    lang: string | ""
  ): Promise<any> => {
    let url = `/agriculture/${lang}/${tag}?sortBy=day&&orderBy=desc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },

  /**
   * Fetches the detailed information of a specific agricultural item.
   *
   * @param {string} id - The ID of the agricultural item.
   * @returns {Promise} - Axios GET request promise.
   */
  getAgricultureDetail: (id: string): Promise<any> => {
    let url = `/agriculture/detail/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the full detailed information of a specific agricultural item.
   *
   * @param {string} id - The ID of the agricultural item.
   * @returns {Promise} - Axios GET request promise.
   */
  getAgricultureDetailFull: (id: string): Promise<any> => {
    let url = `/agriculture/detail-full/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the detailed information of a specific agricultural item in a detailed view.
   *
   * @param {string} id - The ID of the agricultural item.
   * @returns {Promise} - Axios GET request promise.
   */
  getAgricultureItemDetail: (id: string): Promise<any> => {
    let url = `/agriculture/agriculture-item/detail/${id}`;
    return axios.get(url);
  },

  /**
   * Fetches the list of personnel with pagination and visibility options.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - Filter based on visibility status.
   * @returns {Promise} - Axios GET request promise.
   */
  getPersonnelList: (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<any> => {
    let url = `/personnel?sortBy=createdAt&&orderBy=asc`;
    if (limit && page) url += `&&limit=${limit}&&page=${page}`;
    if (visible) url += `&&visible=${visible}`;
    return axios.get(url);
  },
};

export default api;
