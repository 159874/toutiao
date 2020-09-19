import request from '@/utils/request'

// 获取评论列表
export function getComments(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 评论点赞
export function addCommentLike(commentId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消评论点赞
export function deleteCommentLike(commentId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
// 添加评论
export function addCommentPost(data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
