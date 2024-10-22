import { useState } from "react";

/**
 * usePagination: A custom hook for managing pagination in a list of data.
 *
 * This hook provides functionality for paginating through data with a specified number of items per page.
 * It maintains the current page, calculates the maximum number of pages, and provides functions to navigate between pages.
 *
 * @param {Array<any>} data - The array of data to paginate.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @returns {Object} An object containing pagination methods and state:
 *   - {Function} next - Move to the next page, if available.
 *   - {Function} prev - Move to the previous page, if available.
 *   - {Function} jump - Jump to a specific page number.
 *   - {Function} currentData - Retrieve the data for the current page.
 *   - {number} currentPage - The current page number.
 *   - {number} maxPage - The total number of pages.
 */
function usePagination(data: any, itemsPerPage: number) {
  // State to keep track of the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the maximum number of pages based on the data length and items per page
  const maxPage = Math.ceil(data.length / itemsPerPage);

  /**
   * Retrieves the data for the current page.
   *
   * @returns {Array<any>} The data items for the current page.
   */
  function currentData(): Array<any> {
    // Calculate the beginning and end indices for slicing the data array
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  /**
   * Moves to the next page, if available.
   */
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  /**
   * Moves to the previous page, if available.
   */
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  /**
   * Jumps to a specific page number.
   *
   * @param {number} page - The page number to jump to.
   */
  function jump(page: number) {
    // Ensure the page number is within the valid range
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
