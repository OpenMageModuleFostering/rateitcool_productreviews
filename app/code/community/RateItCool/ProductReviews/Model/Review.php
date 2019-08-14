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
class RateItCool_ProductReviews_Model_Review
{

  protected $_id = '';
  protected $time = '';
  protected $recommend = 0;
  protected $negative = 0;
  protected $positive = 0;
  protected $content ='';
  protected $title ='';
  protected $region ='';
  protected $language ='';
//  protected $details = new stdClass();
    /*
    stdClass::__set_state(array(
       'total' => 1,
       'description' => 0,
       'workmanship' => 0,
       'design' => 0,
       'costbenefit' => 0,
    )),
    */
    protected $stars = 0;

    public function map($input) {

      try {
        $this->_id = $input['_id'];
        $this->time = $input['time'];
        $this->recommend = $input['recommend'];
        $this->negative = $input['negative'];
        $this->positive = $input['positive'];
        $this->content = $input['content'];
        $this->title = $input['title'];
        $this->language = $input['language'];
        $this->stars = $input['stars'];
      } catch(Exception $e) {

      }
    }

    public function getTime($format = false) {
      $tempDateTime = new DateTime($this->time);
      if ($format) {
        return Mage::helper('core')->formatDate($tempDateTime->format('Y-m-d'), Mage_Core_Model_Locale::FORMAT_TYPE_LONG, false);
      }
      return $tempDateTime->format('Y-m-d');
    }

    public function getRecommend() {
      return $this->recommend;
    }

    public function getNegative() {
      return $this->negative;
    }

    public function getPositive() {
      return $this->positive;
    }

    public function getContent() {
      return $this->content;
    }

    public function getTitle() {
      return $this->title;
    }

    public function getRegion() {
      return $this->region;
    }

    public function getLanguage() {
      return $this->language;
    }

    public function getDetails() {
      return $this->details;
    }

    public function getStars() {
      return $this->stars;
    }

}
