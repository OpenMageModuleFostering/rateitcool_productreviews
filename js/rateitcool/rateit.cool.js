
var RateItCoolAPI = (function($){
  var _username = 'demo',
      _password = 'password',
      _version = '1.0.0',
      _limit = 3,
      _jQuery = $,
      _oldjQuery = $;

  var _ratingsProductList = function () {
    var productlistSpans = _jQuery('.rate-it-cool-product');
    if (productlistSpans && productlistSpans.length > 0) {

      var gpntype = '',
          gpnvalues = {},
          gpnvalue = '',
          error = true;
      for ( var i = 0; i < productlistSpans.length; i++ ) {
        if (_jQuery(productlistSpans[ i ]).attr('data-gpntype') !== undefined) {
          gpntype =  _jQuery(productlistSpans[ i ]).attr('data-gpntype');
        }
        if (_jQuery(productlistSpans[ i ]).attr('data-gpnvalue') !== undefined) {
          gpnvalue = _jQuery(productlistSpans[ i ]).attr('data-gpnvalue');
          if (gpnvalue.length > 0) {
            if (gpnvalues[gpntype] == undefined) {
              gpnvalues[gpntype] = [];
            }
            gpnvalues[gpntype].push( gpnvalue );
            error = false;
          }
        }
      }
      if (!error) {
        _jQuery.each(gpnvalues, function(gpntype, values) {
          if (values.length > 0) {
            _jQuery.ajax({
              //url : 'https://api.rateit.cool/stars/' + gpntype + '/' + gpnvalues.join(','),
              url : 'http://localhost:8080/stars/' + gpntype + '/' + values.join(','),
              method: 'GET',
              dataType : 'json',
              crossDomain: true,
              async: false,
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
                xhr.setRequestHeader("X-Api-Version", _version);
              },
              success : function(data) {
                if (data.length > 0) {
                  data.forEach(function(oneRatingResponse) {
                    var destinationElement = _jQuery('.rate-it-cool-product[data-gpnvalue=' + oneRatingResponse.gpnvalue + ']');
                    destinationElement.find('.rate-it-cool-review-counts').text(oneRatingResponse.total);
                    destinationElement.find('.rate-it-cool-review-summary').removeClass('rate-it-cool-review-summary-empty').attr('style','width: ' + Number((oneRatingResponse.summary * 20).toFixed(0)) + '%;');
                    destinationElement.find('.rateit-cool-review-link').show();
                  });
                }
              }
            });
          }
        });
      }
    }
  };

  var _ratingsProductDetail = function () {

    var productlistSpans = _jQuery('.rate-it-cool-product-detail'),
        gpntype = '',
        gpnvalue = '';

    if (productlistSpans && productlistSpans.length > 0) {

      if (_jQuery(productlistSpans[0]).attr('data-gpntype') !== undefined) {
        gpntype =  _jQuery(productlistSpans[0]).attr('data-gpntype');
      }
      if (_jQuery(productlistSpans[0]).attr('data-gpnvalue') !== undefined) {
        gpnvalue = _jQuery(productlistSpans[0]).attr('data-gpnvalue');
      }
      var destinationElement = _jQuery(productlistSpans[0]);
      if (gpntype && gpnvalue) {
        _jQuery.ajax({
//          url : 'https://api.rateit.cool/stars/' + gpntype + '/' + gpnvalue,
          url : 'http://localhost:8080/stars/' + gpntype + '/' + gpnvalue,
          method: 'GET',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
            if (data.length > 0) {
              var oneRatingResponse = data[0];
              destinationElement.find('.rate-it-cool-review-counts').text(oneRatingResponse.total);
              destinationElement.find('.rate-it-cool-review-summary').removeClass('rate-it-cool-review-summary-empty').attr('style','width: ' + Number((oneRatingResponse.summary * 20).toFixed(0)) + '%;');
              destinationElement.find('.rateit-cool-review-link').show();
            }
          }
        });
      }
    }
  };

  var _ratingProductFeedbacks = function (productfeedbackSpans, parameters) {
    var gpntype = '',
        gpnvalue = '',
        language = '',
        templateOneFeedback = _jQuery('#rate-it-cool-product-feedbacks-template .feedbackElement').html(),
        templateList = _jQuery('#rate-it-cool-product-feedbacks-template .feedbackElements').html();

    if (productfeedbackSpans.length > 0) {
      if (_jQuery(productfeedbackSpans[0]).attr('data-gpntype') !== undefined) {
        gpntype =  _jQuery(productfeedbackSpans[0]).attr('data-gpntype');
      }
      if (_jQuery(productfeedbackSpans[0]).attr('data-gpnvalue') !== undefined) {
        gpnvalue = _jQuery(productfeedbackSpans[0]).attr('data-gpnvalue');
      }
      if (_jQuery(productfeedbackSpans[0]).attr('data-language') !== undefined) {
        language = _jQuery(productfeedbackSpans[0]).attr('data-language');
      }
      var destinationElement = _jQuery(productfeedbackSpans[0]);
      var extendedString = '';
      if (parameters.sort !== undefined) {
        extendedString += '&sort=' + parameters.sort;
      }
      if (parameters.sortField !== undefined) {
        extendedString += '&sortField=' + parameters.sortField
      }
      if (gpntype && gpnvalue && language) {

        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=' + _limit + '&full=true' + extendedString,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=' + _limit + '&full=true' + extendedString,
          method: 'GET',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
            if (data.elements && data.elements.length > 0) {
              var oneRatingResponse = data[0]
                  , feedbackElements = []
                  , counts = data.total.all;
              if (data.language > 0) {
                counts = data.language;
              }
              if (data.region > 0) {
                counts = data.region;
              }
              templateList = templateList.replace('$five', data.overview.stars.five)
                                          .replace('$four', data.overview.stars.four)
                                          .replace('$three', data.overview.stars.three)
                                          .replace('$two', data.overview.stars.two)
                                          .replace('$one', data.overview.stars.one)
                                          .replace('$total.all', data.total.all)
                                          .replace('$total.language', data.total.language)
                                          .replace('$total.region', data.total.region)
                                          .replace('$count', data.elements.length)
                                          .replace('$showNewtLink', (counts > data.elements.length?'block':'none'))
                                          .split('$gpntype').join(data.gpntype)
                                          .split('$gpnvalue').join(data.gpnvalue)
                                          .split('$language').join(language)
                                          .replace('$recommend', Number(((data.overview.recommend / data.overview.total) *100 ).toFixed(0))) ;
              data.elements.forEach(function(feedback) {
                // create elemnt from template
                var oneFeedback = templateOneFeedback;
                oneFeedback = oneFeedback.replace('$review.stars', (feedback.stars * 20))
                                          .replace('$review.time', new Date(feedback.time).toLocaleString())
                                          .replace('$review.title', feedback.title)
                                          .replace('$review.content', feedback.content)
                                          .split('$review.id').join(feedback._id)
                                          .split('$review.gpntype').join(data.gpntype)
                                          .split('$review.gpnvalue').join(data.gpnvalue)
                                          .split('$review.language').join(feedback.language + '_' + feedback.region)
                                          .split('$review.positive').join(feedback.positive)
                                          .split('$review.negative').join(feedback.negative);

                feedbackElements.push(oneFeedback);
              });
              destinationElement.html(templateList.replace('$list',feedbackElements.join('')));
            }
          }
        });
      }
    }
  };

  var _ratingProductFeedbacksRefresh = function (productfeedbackSpans, parameters, callback) {
    var gpntype = '',
        gpnvalue = '',
        language = '',
        templateOneFeedback = _jQuery('#rate-it-cool-product-feedbacks-template .feedbackElement').html(),
        templateList = _jQuery('#rate-it-cool-product-feedbacks-template .feedbackElements').html();

    // delete template from page
    //$('#rate-it-cool-product-feedbacks-template').remove();

    if (productfeedbackSpans.length > 0) {
      if (_jQuery(productfeedbackSpans[0]).attr('data-gpntype') !== undefined) {
        gpntype =  _jQuery(productfeedbackSpans[0]).attr('data-gpntype');
      }
      if (_jQuery(productfeedbackSpans[0]).attr('data-gpnvalue') !== undefined) {
        gpnvalue = _jQuery(productfeedbackSpans[0]).attr('data-gpnvalue');
      }
      if (_jQuery(productfeedbackSpans[0]).attr('data-language') !== undefined) {
        language = _jQuery(productfeedbackSpans[0]).attr('data-language');
      }
      var destinationElement = _jQuery(productfeedbackSpans[0]);
      var extendedString = '';
      if (parameters.sortField !== undefined && parameters.sort !== undefined) {
        extendedString = parameters.extraParameter;
        extendedString += '&sort=' + parameters.sort;
        extendedString += '&sortField=' + parameters.sortField;
        _jQuery('.showMoreFeedbacks').attr('data-extraParameter', extendedString);
      } else if (parameters.stars !== undefined) {
        extendedString += '&stars=' + parameters.stars;
        _jQuery('.showMoreFeedbacks').attr('data-extraParameter', extendedString);
        _jQuery('[name=reorderReviews]').attr('data-extraParameter', extendedString);
      }

      if (gpntype && gpnvalue && language) {

        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=' + _limit + extendedString,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=' + _limit + extendedString,
          method: 'GET',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
            var counts = data.total.all;
            if (data.language > 0) {
              counts = data.language;
            }
            if (data.region > 0) {
              counts = data.region;
            }
            if (_limit >= counts) {
              // disable next link
              _jQuery('.showMoreFeedbacks').parent().hide();
            } else {
              // set skip count
              _jQuery('.showMoreFeedbacks').parent().show();
              _jQuery('.showMoreFeedbacks').attr('data-count', (_limit) );
            }
            if (data.elements && data.elements.length > 0) {

              var feedbackElements = [];

              data.elements.forEach(function(feedback) {
                // create elemnt from template
                var oneFeedback = templateOneFeedback;
                oneFeedback = oneFeedback.replace('$review.stars', (feedback.stars * 20))
                                          .replace('$review.time', new Date(feedback.time).toLocaleString())
                                          .replace('$review.title', feedback.title)
                                          .replace('$review.content', feedback.content)
                                          .split('$review.id').join(feedback._id)
                                          .split('$review.gpntype').join(data.gpntype)
                                          .split('$review.gpnvalue').join(data.gpnvalue)
                                          .split('$review.language').join(feedback.language + '_' + feedback.region)
                                          .split('$review.positive').join(feedback.positive)
                                          .split('$review.negative').join(feedback.negative);

                feedbackElements.push(oneFeedback);
              });
              _jQuery('.rate-it-cool-product-feedbacks .list').html(feedbackElements.join(''));
              callback();
            }
          }
        });
      }
    }
  };

  var _registerClickFeedbackSend = function() {
      _jQuery('.rateit-cool-send-feedback a').on('click', function(e){
      e.preventDefault();
      var gpntype = _jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=gpntype]').val(),
          gpnvalue = _jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=gpnvalue]').val(),
          language = _jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=language]').val(),
          feedbackElement = {
            stars: parseInt(_jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=stars]').val()),
            title: _jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=feedbackTitle]').val(),
            content: _jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=feedbackContent]').val(),
            recommend: (_jQuery('form[name=' + _jQuery(this).attr('data-formname') + ']').find('[name=recommend]').is(':checked')?1:0)
          },
          destinationElement = _jQuery(this);

      if (gpntype && gpnvalue && language && feedbackElement.title !== '' && feedbackElement.content !== '' && feedbackElement.stars > 0) {
        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language,
          method: 'POST',
          data: JSON.stringify(feedbackElement),
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success: function(data) {
            _jQuery('#' + destinationElement.attr('data-formname')).removeClass('error').addClass('success');
            _jQuery('form[name=' + destinationElement.attr('data-formname') + ']').hide();
            _jQuery('form[name=' + destinationElement.attr('data-formname') + ']').parent().find('.rateit-cool-send-feedback-error').hide();
            _jQuery('form[name=' + destinationElement.attr('data-formname') + ']').parent().find('.rateit-cool-send-feedback-success').show();
          },
          error: function() {
            _jQuery('#' + destinationElement.attr('data-formname')).removeClass('success').addClass('error');
            _jQuery('form[name=' + destinationElement.attr('data-formname') + ']').parent().find('.rateit-cool-send-feedback-success').hide();
            _jQuery('form[name=' + destinationElement.attr('data-formname') + ']').parent().find('.rateit-cool-send-feedback-error').show();
          }
        });
      } else {
        if (feedbackElement.title === '') {
          _jQuery('#' + destinationElement.attr('data-formname')).find('[name=feedbackTitle]').addClass('missing-value');
        }
        if (feedbackElement.content === '') {
          _jQuery('#' + destinationElement.attr('data-formname')).find('[name=feedbackContent]').addClass('missing-value');
        }
        if (feedbackElement.stars <= 0) {
          _jQuery('#' + destinationElement.attr('data-formname')).find('.star').addClass('missing-value');
        }
      }
    });
  };

  var _fillStarsOnClick = function() {
    // fill stars on click
    _jQuery('.reviewStars span.value1').on('click', function(e) {
      e.preventDefault();
      _jQuery(this).parent().find('.star2').removeClass('star2').addClass('star0');
      _jQuery(this).removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('[name=stars]').val(1);
      _jQuery(this).parent().find('.star-text').html(_jQuery(this).attr('title'));
    });

    _jQuery('.reviewStars span.value2').on('click', function(e) {
      e.preventDefault();
      _jQuery(this).parent().find('.star2').removeClass('star2').addClass('star0');
      _jQuery(this).parent().find('.value1').removeClass('star0').addClass('star2');
      _jQuery(this).removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('[name=stars]').val(2);
      _jQuery(this).parent().find('.star-text').html(_jQuery(this).attr('title'));
    });

    _jQuery('.reviewStars span.value3').on('click', function(e) {
      e.preventDefault();
      _jQuery(this).parent().find('.star2').removeClass('star2').addClass('star0');
      _jQuery(this).parent().find('.value1').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value2').removeClass('star0').addClass('star2');
      _jQuery(this).removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('[name=stars]').val(3);
      _jQuery(this).parent().find('.star-text').html(_jQuery(this).attr('title'));
    });

    _jQuery('.reviewStars span.value4').on('click', function(e) {
      e.preventDefault();
      _jQuery(this).parent().find('.star2').removeClass('star2').addClass('star0');
      _jQuery(this).parent().find('.value1').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value2').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value3').removeClass('star0').addClass('star2');
      _jQuery(this).removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('[name=stars]').val(4);
      _jQuery(this).parent().find('.star-text').html(_jQuery(this).attr('title'));
    });

    _jQuery('.reviewStars span.value5').on('click', function(e) {
      e.preventDefault();
      _jQuery(this).parent().find('.star2').removeClass('star2').addClass('star0');
      _jQuery(this).parent().find('.value1').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value2').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value3').removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('.value4').removeClass('star0').addClass('star2');
      _jQuery(this).removeClass('star0').addClass('star2');
      _jQuery(this).parent().find('[name=stars]').val(5);
      _jQuery(this).parent().find('.star-text').html(_jQuery(this).attr('title'));
    });
    // fill stars on click end
  };

  var _sendHelpfulOnClick = function () {
    _jQuery('.helpful').delegate('.positive', 'click', function(e) {
      e.preventDefault();
      var feedbackId = _jQuery(this).attr('data-feedbackid'),
          gpntype = _jQuery(this).attr('data-gpntype'),
          gpnvalue = _jQuery(this).attr('data-gpnvalue'),
          language = _jQuery(this).attr('data-language'),
          positive = parseInt(_jQuery(this).attr('data-positive')),
          destinationElement = _jQuery(this).find('.positiveValue'),
          thisElement = _jQuery(this);
      if (feedbackId && gpntype && gpnvalue && language) {
        thisElement.attr('data-positive', (positive+1));
        _jQuery(destinationElement).html(positive+1);
        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?helpful=positive&id='+feedbackId,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?helpful=positive&id='+feedbackId,
          method: 'PUT',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
            thisElement.attr('data-positive', (positive+1));
            _jQuery(destinationElement).html(positive+1);
          }
        });
      }
    });
  };

  var _sendIncorrectOnClick = function () {
    _jQuery('.incorrect').delegate('.incorrect', 'click', function(e) {
      e.preventDefault();
      var feedbackId = _jQuery(this).attr('data-feedbackid'),
          gpntype = _jQuery(this).attr('data-gpntype'),
          gpnvalue = _jQuery(this).attr('data-gpnvalue'),
          language = _jQuery(this).attr('data-language'),
          thisElement = _jQuery(this);

      if (feedbackId && gpntype && gpnvalue && language) {
        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?incorrect=1&id='+feedbackId,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?incorrect=1&id='+feedbackId,
          method: 'PUT',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
          }
        });
      }
    });
  };

  var _sendNotHelpfulOnClick = function() {
    _jQuery('.helpful').delegate('.negative', 'click', function(e) {
      e.preventDefault();
      var feedbackId = _jQuery(this).attr('data-feedbackid'),
          gpntype = _jQuery(this).attr('data-gpntype'),
          gpnvalue = _jQuery(this).attr('data-gpnvalue'),
          language = _jQuery(this).attr('data-language'),
          negative = parseInt(_jQuery(this).attr('data-negative')),
          destinationElement = _jQuery(this).find('.negativeValue'),
          thisElement = _jQuery(this);

      thisElement.attr('data-negative', (negative+1));
      _jQuery(destinationElement).html(negative+1);

      if (feedbackId && gpntype && gpnvalue && language) {
        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?helpful=negative&id='+feedbackId,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?helpful=negative&id='+feedbackId,
          method: 'PUT',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
          }
        });
      }
    });
  };

  var _reorderAfterChangeOrder = function () {
    _jQuery('select[name=reorderReviews]').on('change', function(e) {
      var sortFieldValue = _jQuery(this).val(),
          sortFieldSortArray = _jQuery(this).val().split(';'),
          sortField = sortFieldSortArray[0],
          sort = sortFieldSortArray[1],
          extraParameter = _jQuery(this).attr('data-extraParameter'),
          optionText = _jQuery('.rate-it-cool-product-feedbacks select[name=reorderReviews] option[value="' + sortFieldValue +  '"]').text();

      _ratingProductFeedbacksRefresh(_jQuery('.rate-it-cool-product-feedbacks'),
          {sortField: sortField, sort: sort, extraParameter: extraParameter},
          function() {
              _jQuery('.rate-it-cool-product-feedbacks select[name=reorderReviews]').parent().find('.js--fancy-select-text').text(optionText);
          }
      );
    });
  };

  var _showFeedbacksWithStarsOnClick = function() {
    _jQuery('a.showOnlyStars').on('click',function(e) {
      e.preventDefault();
      var stars = _jQuery(this).attr('data-stars');
      _ratingProductFeedbacksRefresh(_jQuery('.rate-it-cool-product-feedbacks'), {stars: stars}, function() {

      });
    });
  };

  var _showMoreFeedbacksOnClick = function () {
    _jQuery('.showMoreFeedbacks').on('click', function(e) {
      e.preventDefault();
      var gpntype = _jQuery(this).attr('data-gpntype'),
          gpnvalue = _jQuery(this).attr('data-gpnvalue'),
          language = _jQuery(this).attr('data-language'),
          count = parseInt(_jQuery(this).attr('data-count')),
          templateOneFeedback = _jQuery('#rate-it-cool-product-feedbacks-template .feedbackElement').html(),
          extraParameter = _jQuery(this).attr('data-extraParameter'),
          feedbackElements = [];
      if (gpntype && gpnvalue && language && count && extraParameter != undefined) {
        _jQuery.ajax({
          //url : 'https://api.rateit.cool/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=5&skip=' + count + extraParameter,
          url : 'http://localhost:8080/feedback/' + gpntype + '/' + gpnvalue + '/' + language + '?limit=5&skip=' + count + extraParameter,
          method: 'GET',
          dataType : 'json',
          crossDomain: true,
          async: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(_username + ":" + _password));
            xhr.setRequestHeader("X-Api-Version", _version);
          },
          success : function(data) {
            var rescounts = data.total.all;
            if (data.language > 0) {
              rescounts = data.language;
            }
            if (data.region > 0) {
              rescounts = data.region;
            }
            if ((count + data.elements.length) >= rescounts) {
              // disable next link
              _jQuery('.showMoreFeedbacks').parent().hide();
            } else {
              // set skip count
              _jQuery('.showMoreFeedbacks').attr('data-count', (count + data.elements.length) );
            }
            if (data.elements && data.elements.length > 0) {
              // render each feedback
              data.elements.forEach(function(feedback) {
                // create elemnt from template
                var oneFeedback = templateOneFeedback;
                oneFeedback = oneFeedback.replace('$review.stars', (feedback.stars * 20))
                                          .replace('$review.time', new Date(feedback.time).toLocaleString())
                                          .replace('$review.title', feedback.title)
                                          .replace('$review.content', feedback.content)
                                          .split('$review.id').join(feedback._id)
                                          .split('$review.gpntype').join(data.gpntype)
                                          .split('$review.gpnvalue').join(data.gpnvalue)
                                          .split('$review.language').join(feedback.language + '_' + feedback.region)
                                          .split('$review.positive').join(feedback.positive)
                                          .split('$review.negative').join(feedback.negative);
                _jQuery('.rate-it-cool-product-feedbacks .list').append(oneFeedback);
              });
            }
          }
        });
      }

    });
  }

  var _ready = function() {
    // get ratings in a list
    _ratingsProductList();
    // get rating for detail page
    _ratingsProductDetail();
    // get the feedbacks
    _ratingProductFeedbacks(_jQuery('.rate-it-cool-product-feedbacks'), {});

    // onchange event
    _reorderAfterChangeOrder();

    // onclick events
    _registerClickFeedbackSend();
    _fillStarsOnClick();
    _sendHelpfulOnClick();
    _sendNotHelpfulOnClick();
    _showFeedbacksWithStarsOnClick();
    _showMoreFeedbacksOnClick();
    _sendIncorrectOnClick();
  }

  return {
    init: function(params) {
      _username = params.username;
      _password = params.password;
      _limit = params.limit;
      if (params.noConflict) {
        _jQuery = jQuery.noConflict();
        $ = _oldjQuery;
        jQuery = $;
      }
      _jQuery(document).ready(function() {
        _ready();
      });
    }
  };

})(jQuery);
