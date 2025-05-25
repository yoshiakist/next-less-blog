import mock from './services/mock'
import newt from './services/newt'
import microcms from './services/microcms'

const CMS_NAME = process.env.CMS_NAME || 'mock'

let cms: typeof mock | typeof newt | typeof microcms

switch (CMS_NAME) {
  case 'mock':
    cms = mock
    break
  case 'newt':
    cms = newt
    break
  case 'microcms':
    cms = microcms
    break
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
