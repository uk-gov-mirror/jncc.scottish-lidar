
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { Product } from '../../catalog/types'
import { State, MapActions, DispatchProps } from '../../state'
import { BasketItem } from '../../basket'
// import { useBasket } from '../../basket'

type Props = { 
  product: Product
  hovered: Product | undefined
  isInBasket: boolean
  toggleBasketItem: (item: BasketItem) => void
}

let ProductListItemComponent = (props: Props & DispatchProps) => {

  let isHovered = props.product === props.hovered
  let titleCssClass = isHovered ? 'product-list-item-title-highlight': ''

  let inBasketItemCssClass = props.isInBasket ? 'product-list-item-basket-in' : ''

  return (
    <AnimatePresence>
      <motion.div
        variants={animationVariants}
        exit="hidden"
        positionTransition={{ type: 'tween' }}
        className="product-list-item"
        onMouseOver={() => props.dispatch(MapActions.productHovered(props.product))}
        onMouseOut={() => props.dispatch(MapActions.productUnhovered(props.product))}
        >
        {isHovered &&
        <div className="product-list-item-highlight" />
        }
        <div className={'product-list-item-title ' + titleCssClass}>
          <i className="fas fa-chevron-right fa-xs mr-1"/>
          {props.product.data.product.title}
        </div>
        <div className="product-list-item-size">

        </div>
        <div className={'product-list-item-basket ' + inBasketItemCssClass}
          onClick={() => props.toggleBasketItem({
            id: props.product.id,
            name: props.product.name,
            title: props.product.metadata.title,
            url: props.product.data.product!.http!.url,
            type: props.product.data.product!.http!.type!,
            size: props.product.data.product!.http!.size!,
          })}
        >
          <i className="fas fa-shopping-cart" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

let animationVariants = {
  visible: { opacity: 1, x: 0 },
  hidden : { opacity: 0, x: 80 },
}

export const ProductListItem = reduxConnect()(ProductListItemComponent)
