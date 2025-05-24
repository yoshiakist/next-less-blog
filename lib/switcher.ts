import newt from './newt'

const CMS_NAME = process.env.CMS_NAME || 'newt'

let cms: typeof newt

switch (CMS_NAME) {
  case 'newt':
    cms = newt
    break
  // case 'microcms':
  //   cms = require('./microcms').default
  //   break
  default:
    throw new Error(`未対応のCMSです: ${CMS_NAME}`)
}

export const getApp = cms.getApp
export const getArticles = cms.getArticles
export const getArticleBySlug = cms.getArticleBySlug
export const getTagBySlug = cms.getTagBySlug
export const getArticlesByTagId = cms.getArticlesByTagId
export const getPast3Articles = cms.getPast3Articles
export const getTags = cms.getTags 
