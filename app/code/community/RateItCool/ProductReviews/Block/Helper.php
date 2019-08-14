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
 * Product Reviews helper
 *
 * @category   RateItCool
 * @package    RateItCool_ProductReviews
 * @author     Cool Services GbR <thomas.gravel@rateit.cool>
 */
class RateItCool_ProductReviews_Block_Helper extends Mage_Core_Block_Template
{
    protected $_availableTemplates = array(
        'default' => 'productreviews/helper/summary.phtml',
        'short'   => 'productreviews/helper/summary_short.phtml'
    );

    protected $_apiUserName = 'demo';
    protected $_apiKey = 'password';

    public function __construct()
    {
      $this->_apiUserName = Mage::getStoreConfig('catalog/RateItCool_ProductReviews/api_user');
      $this->_apiKey = Mage::getStoreConfig('catalog/RateItCool_ProductReviews/api_key');
      parent::__construct();
    }

    public function getSummaryHtml($product, $templateType, $displayIfNoReviews)
    {
      // pick template among available
      if (empty($this->_availableTemplates[$templateType])) {
          $templateType = 'default';
      }
      $this->setTemplate($this->_availableTemplates[$templateType]);
      $this->setProduct($product);

      return $this->toHtml();
    }

    public function getGpnValue()
    {
      if ($this->getProduct()->getEan() != NULL) {
        return $this->getProduct()->getEan();
      } else if ($this->getProduct()->getSku() != NULL) {
        return $this->getProduct()->getSku();
      } else {
        return $this->getProduct()->getId();
      }
    }

    public function getGpnType()
    {
      if ($this->getProduct()->getEan() != NULL) {
        return 'ean';
      } else {
        return $this->_apiUserName;
      }
    }

    public function getReviewsUrl()
    {
        return Mage::getUrl('review/product/list', array(
           'id'        => $this->getProduct()->getId(),
           'category'  => $this->getProduct()->getCategoryId()
        ));
    }

    /**
     * Add an available template by type
     *
     * It should be called before getSummaryHtml()
     *
     * @param string $type
     * @param string $template
     */
    public function addTemplate($type, $template)
    {
Mage::Log('RateItCool addTemplate');
        $this->_availableTemplates[$type] = $template;
    }
}
