
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import _ from 'lodash'

import { CollectionTuple } from '../../state'
import { getLicenceDetailsFromUseConstraints } from '../../utility/licenseUtility'
import { DatasetPath } from '../../shared/DatasetPath'
import { WmsModal } from '../../shared/WmsModal'
import { Tip } from '../../shared/Tip'

type Props = {
  collection: CollectionTuple
}

export const ListItem = (props: Props) => {

  let c = props.collection
  let abstractElementId = 'abstract-' + c.collection.id
  let [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className="list-item row mb-lg-3 mb-5">

      <div className="col mb-lg-0 mb-3">

        {/* Title */}
        <div className="list-item-title">
          <i className="fas fa-th fa-lg text-primary mr-2" />
          <span className="ml-1">
            {c.collection.metadata.title}
          </span>
        </div>      

        {/* Path */}
        <div className="list-item-dataset-name mb-2">
          <DatasetPath dataset={c.path.dataset} />
        </div>

        {/* Abstract */}
        <div className="list-item-abstract moreable">
          <p id={abstractElementId}
            className="collapse moreable-content"
            aria-expanded="false">
            {c.collection.metadata.abstract}
          </p>
          <a role="button" className="collapsed"
            data-toggle="collapse" href={'#' + abstractElementId}
            aria-expanded="false" aria-controls="collapseExample"></a>
        </div>        
      </div>

      <div className="col-lg-3 d-flex align-items-lg-center">

        <div className="">

          {/* Licence */}
          <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
            {makeLicenceElement(c.collection.metadata.useConstraints, c.collection.id)}
          </div>

          {/* Metadata */}
          <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
            {c.collection.metadata.additionalInformationSource &&
                makeExternalMetadataLinkElement(c.collection.metadata.additionalInformationSource, c.collection.id)
            }
          </div>

          {/* WMS */}
          {c.ogcProduct && c.ogcProduct.data.product.wms &&
            <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
              <Button variant="light" onClick={() => setModalOpen(true)}>
                <i className="fas fa-globe text-secondary mr-2" />
                WMS
              </Button>
              <WmsModal
                show={modalOpen}
                onHide={() => setModalOpen(false)}
                wmsLink={c.ogcProduct.data.product.wms.url}
              />
            </div>
          }

          {/* View on map */}
          <div className="mb-lg-2 mb-0 mr-1 d-inline-block">
            <Link
              to={{
                pathname: '/map',
                search: c.path.dataset
              }}
              className="btn btn-primary"
            >View on map</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

let makeLicenceElement = (useConstraints: string, collectionId: string) => {
  let licence = getLicenceDetailsFromUseConstraints(useConstraints)
  return (
    <a href={licence.url} target="_blank" className="btn btn-light" >
      { licence.image
        ? <Tip identifier={'lic' + collectionId} content={licence.name}>
            <img src={licence.image} width="56" height="23" />
          </Tip>
        : <Tip identifier={'lic' + collectionId} content={licence.name}>
            <span>
              <i className="fas fa-book-open text-secondary mr-2" />
              Licence
            </span>
          </Tip>
      }
    </a>
  )
}

let makeExternalMetadataLinkElement = (metadataExternalLink: string, collectionId: string) => {
  return (
    <Tip identifier={collectionId} content="More information about this dataset">
      <a className="btn btn-light" href={metadataExternalLink} target="_blank">
        <i className="fas fa-cog text-secondary mr-2" />
        Metadata
      </a>
    </Tip>
  )
}
