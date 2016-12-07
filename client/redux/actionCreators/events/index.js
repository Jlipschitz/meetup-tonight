import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';


export function editSearchInput(item) {
  return {
    type: actionTypes.SEARCH_INPUT_CHANGE,
    searchInput: item.searchInput
  };
}
//
// export function addPostRequest(postBody) {
//   return dispatch => request.post({
//     route: '/api/events',
//     body: postBody
//   }).then(({ data }) => dispatch(addPost(data)));
// }
//
//
// export function updatePost({index, post}) {
//   return {
//     type: actionTypes.UPDATE_POST,
//     index,
//     post
//   };
// }

// export function updatePostRequest(postForm) {
//   const index = postForm.editIndex;
//   return dispatch => request.put({
//       route: `/api/post/${postForm.editId}`,
//       body: {
//         title: postForm.title,
//         body: postForm.body,
//         createdDate: new Date()
//       }
//     }).then(({ data }) =>
//       dispatch(updatePost({
//         index: index,
//         post: data
//       })));
// }
