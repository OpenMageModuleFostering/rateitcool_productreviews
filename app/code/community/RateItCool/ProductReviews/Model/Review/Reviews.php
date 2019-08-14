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
 * Review model
 *
 * @category   RateItCool
 * @package    RateItCool_ProductReviews
 * @author     Cool Services GbR <thomas.gravel@rateit.cool>
 */
class RateItCool_ProductReviews_Model_Review_Reviews extends Mage_Core_Model_Abstract
{

    protected $_server_api_key = '';
    protected $_api_key = '';
    protected $_server_api_username = '';

    protected function _construct()
    {
      $this->_server_api_username = Mage::getStoreConfig('catalog/RateItCool_ProductReviews/api_user');
      $this->_server_api_key = Mage::getStoreConfig('catalog/RateItCool_ProductReviews/server_api_key');
      $this->_api_key = Mage::getStoreConfig('catalog/RateItCool_ProductReviews/api_key');
      $this->_init('productreviews/review_reviews');
    }

    public function getCollection($gpntype, $gpnvalue)
    {
      // get from api
      $headers = array(
          'Content-Type:application/json',
          'X-Api-Version: 1.0.0',
          'X-Api-Key: ' . $this->_api_key,
          'Origin: localhost',
          'Authorization: Basic '. base64_encode($this->_server_api_username . ':' . $this->_server_api_key)
      );
      try {
        $url = 'https://api.rateit.cool/feedback/' . $gpntype . '/' . $gpnvalue;
        $url .= '/' . Mage::app()->getLocale()->getLocaleCode() . '?&limit=5';
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($this->request, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($this->request, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $returnElement = array();

        if( ! $response = curl_exec($ch))
        {
          return $returnElement;
        }
        curl_close($ch);
      } catch(Exception $ex) {

      }

      try {
        $reponseObj = json_decode($response, true);
        foreach($reponseObj['elements'] as $element) {
          $review = new RateItCool_ProductReviews_Model_Review();
          $review->map($element);
          $returnElement[] = $review;
        }
      } catch (Exception $e) {
        return $returnElement;
      }

      return $returnElement;
    }

}
