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
 * Order item render block
 *
 * @category   RateItCool
 * @package    RateItCool_ProductReviews
 * @author     Cool Services GbR <thomas.gravel@rateit.cool>
 */
class RateItCool_ProductReviews_Block_Order_Item_Renderer_Default extends Mage_Sales_Block_Order_Item_Renderer_Default
{
  public function getName() {
    return 'NBLA';
  }

  public function getSummaryHtml($product, $templateType, $displayIfNoReviews)
  {

    die('bla');
    // pick template among available
    if (empty($this->_availableTemplates[$templateType])) {
        $templateType = 'default';
    }
    $this->setTemplate($this->_availableTemplates[$templateType]);
    $this->setProduct($product);

    return $this->toHtml();
  }
}
