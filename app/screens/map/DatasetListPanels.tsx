
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'

type Props = {
  collections: CollectionTuple[]
  productCountByCollection: { collectionName: string, products: number }[]
}

export const DatasetListPanels = (props: Props) => {
  
  let collectionList = props.collections.map(c => {
    let productCountResult = props.productCountByCollection
      .find(x => x.collectionName === c.collection.name)
    let productCountForCurrentQuery = productCountResult ? productCountResult.products : 0
    return { ...c, productCount: productCountForCurrentQuery }
  })

  let datasetGroupElements = _(collectionList)
    .groupBy(c => c.name.Group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return <div key={key}>
        
        <div>key {key}</div>
        {collections.map(c => {
          return <div key={c.collection.name}>
            <div>{c.collection.name} {c.productCount}</div>
            <div></div>
          </div>
        })}
      </div>
    })
    .value()

  return <>
    <div className="panel left-panel-a">
      <h4>Matching datasets</h4>
      <div>Datasets that match your query</div>
      <div className="mb-2">
        <span><i className="fas fa-globe mr-1" />Something</span>
      </div>
      <div>
        {datasetGroupElements}
      </div>
    </div>
    <div className="panel left-panel-b">
      <h4>Non-matching datasets</h4>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus. Tincidunt id aliquet risus
        feugiat in ante metus dictum. Velit euismod in pellentesque massa placerat duis. Lorem dolor sed
        viverra ipsum. Dui faucibus 
      </div>
    </div>
  </>
}