<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category   RateItCool
 * @package    RateItCool_ProductReviews
 * @author     Cool Services GbR <thomas.gravel@rateit.cool>
 * @copyright  Copyright (c) 2015 Cool Services GbR (https://www.rateit.cool)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Detailed Product Reviews
 *
 * @category   RateItCool
 * @package    RateItCool_ProductReviews
 * @author     Cool Services GbR <thomas.gravel@rateit.cool>
 */
class RateItCool_ProductReviews_Block_Product_View_List extends Mage_Review_Block_Product_View
{
  protected $_forceHasOptions = false;

  public function getProductId()
  {
    return Mage::registry('product')->getId();
  }

  public function getGpnValue()
  {
    return $this->getProduct()->getGpnValue();
  }

  public function getGpnType()
  {
    return $this->getProduct()->getGpnType();
  }

  public function getReviewUrl($id)
  {
    return Mage::getUrl('review/product/view', array('id' => $id));
  }

  public function getReviewsCollection()
  {
    if (null === $this->_reviewsCollection) {
      $this->_reviewsCollection = Mage::getModel('productreviews/reviews')->getCollection($this->getProduct()->getGpnType(), $this->getProduct()->getGpnValue());
    }
    return $this->_reviewsCollection;
  }

}
