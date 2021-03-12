/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-12 13:20:46
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 21:32:50
 */

/**
 * @swagger
 * definitions:
 *  PostCreateObject:
 *   type: object
 *   properties:
 *    heading:
 *     type: string
 *     description: Post Heading
 *     example: 'Post Heading'
 *    content:
 *     type: string
 *     description: Post Content
 *     example: 'Post Content'
 *    tags:
 *     type: string
 *     description: tags for support search
 *     example: 'tag1,tag2'
 */

/**
 * @swagger
 * definitions:
 *  CommentCreateObject:
 *   type: object
 *   properties:
 *    comment:
 *     type: string
 *     description: user comment
 *     example: 'Comment...'
 */

/**
 * @swagger
 * definitions:
 *  CommentObject:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: user id
 *     example: '604a2c35675e504b423ec243'
 *    comment:
 *     type: string
 *     description: user comment text
 *     example: 'comment....'
 *    status:
 *     type: boolean
 *     description: active comment or not
 *     example: true
 *    created_by:
 *     $ref: '#/definitions/UserObject'
 *    created_at:
 *     type: date-time
 *     description: Created AT
 *     example: "2018-03-20T09:12:28Z"
 */

/**
 * @swagger
 * definitions:
 *  PostObject:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: user id
 *     example: '604a2c35675e504b423ec243'
 *    heading:
 *     type: string
 *     description: Post Heading
 *     example: 'Post Heading'
 *    content:
 *     type: string
 *     description: Post Content
 *     example: 'Post Content'
 *    tags:
 *     type: string
 *     description: tags for support search
 *     example: 'tag1,tag2'
 *    comments:
 *     items:
 *        $ref: '#/definitions/CommentObject'
 *    status:
 *     type: string
 *     enum: [PENDING, APPROVED,BLOCKED]
 *    created_by:
 *     $ref: '#/definitions/UserObject'
 *    updated_at:
 *     type: date-time
 *     description: Updated AT
 *     example: "2018-03-20T09:12:28Z"
 *    created_at:
 *     type: date-time
 *     description: Created AT
 *     example: "2018-03-20T09:12:28Z"
 *    deleted_at:
 *     type: date-time
 *     description: Deleted AT
 *     example: "2018-03-20T09:12:28Z"
 */
