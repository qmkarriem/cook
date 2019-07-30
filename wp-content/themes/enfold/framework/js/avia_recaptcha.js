window.aviaRecaptchaCallback = null;
window.aviaRecaptchaSuccess = null;

(function($) {
    $.aviaRecaptcha = {
        av_alien_alert_obj: [],

        aviaRecaptchaAlert: function( button ) {
            button.addEventListener( 'click', function( event ) {    
                var disabled = event.target.classList.contains( 'avia-button-default-style' );
                if( disabled ) {
                    event.preveDefault();
                    alert( 'Are you human? Verify with reCAPTCHA first.' );
                }  
            });
        },

        aviaRecaptchaSetTokenName: function( form, form_id ) {
            var n = form.getElementsByTagName( 'input' );
            var t = n[0].getAttribute( 'value' );
            var d = n[0].getAttribute( 'id' );
            var v = null;
            
            if( d == 'avia_1_' + form_id ) {
                n[0].setAttribute( 'name', 'avia_label_input' );
                v = n[0].value;
            };   

            return v;
        },
                
        aviaRecaptchaDetectHuman: function( form, action ) {
            document.body.addEventListener( 'mousemove', function( event ) {
                form.setAttribute( 'action', action );
            }, false );

            document.body.addEventListener( 'touchmove', function( event ) {
                form.setAttribute( 'action', action );
            }, false );

            document.body.addEventListener( 'keydown', function( event ) {
                if ( ( event.keyCode === 9 ) || ( event.keyCode === 13 ) ) {
                    form.setAttribute( 'action', action );
                }
            }, false );
        },

        aviaRecaptchaNotice: function( el, notice ) {
            var p = document.createElement( 'p' );
            var t = document.createTextNode( notice );
            p.appendChild( t );
            p.classList.add( 'g-recaptcha-notice' );                           
            el.parentNode.insertBefore( p, el );
        },

        aviaRecaptchaPlaceholder: function( el, key ) {
            var p = document.createElement( "p" );
            p.classList.add( 'g-recaptcha-widget' );  
            p.setAttribute( 'data-sitekey', key );                    
            el.parentNode.insertBefore( p, el );
        },

        aviaRecaptchaLogoRemove:function() {
            var logo = document.querySelectorAll( '.grecaptcha-badge' );
            if( logo ) {
                for ( var i = 0; i < logo.length; i++ ) {
                    logo[ i ].style.display = 'none';
                }  
            }
        },

        aviaRecaptchaSuccess: function( token ) {
            if( ! token ) return;
            $.aviaRecaptcha.aviaRecaptchaVerify( token, $.aviaRecaptcha.av_alien_alert_obj );
        },

        aviaRecaptchaVerify: function( token, alert_obj ) {
            if( ! token ) return;

            jQuery.ajax( {
                type: "POST",
                url: avia_framework_globals.ajaxurl,
                data: {
                    g_recaptcha_response: token,
                    g_recaptcha_nonce: avia_recaptcha.verify_nonce,
                    g_recaptcha_alert: alert_obj,
                    action: 'avia_ajax_recaptcha_verify'
                },
                success: function( response ) {  
                    var results = JSON.parse( response ); 

                    if ( results.success == false ) return;

                    // todo: reverify if score is less than the allowed threshold

                    var forms = document.querySelectorAll( '.av-form-recaptcha' );
                    var notices = document.getElementsByClassName( 'g-recaptcha-notice' );
                    var widgets = document.getElementsByClassName( 'g-recaptcha-widget' );    
                    var buttons = document.querySelectorAll( 'input[type="submit"]' );
                    var label = null;

                    for ( var i = 0; i < buttons.length; i++ ) {
                        if( buttons[ i ].classList.contains( 'avia-button-default-style') ) {
                            label = buttons[ i ].getAttribute( 'data-submit-label' );
                            buttons[ i ].value = $.aviaRecaptcha.aviaRecaptchaTextDecode( label );
                            buttons[ i ].removeAttribute( 'disabled' );
                            buttons[ i ].classList.remove( 'avia-button-default-style' );  
                        }         
                    }

                    for ( var i = 0; i < notices.length; i++ ) {
                        notices[ i ].style.display = 'none';
                    }   
                    
                    for ( var i = 0; i < widgets.length; i++ ) {
                        widgets[ i ].style.display = 'none';
                    } 

                    for ( var i = 0; i < forms.length; i++ ) {
                        forms[ i ].classList.remove( 'av-form-labels-style' );
                    } 
                },
                error: function() {
                },
                complete: function() {
                }
            } );
        },

        aviaRecaptchaExpired: function() {
            grecaptcha.ready(function() {
                grecaptcha.reset();
            });
        },

        aviaRecaptchaTextDecode: function( text ) {
            return decodeURIComponent(text.replace(/\+/g, ' '));
        },

        aviaRecaptchaRender: function() {    
            var forms = document.querySelectorAll( '.av-form-recaptcha' );	

            for ( var i = 0; i < forms.length; i++ ) {
        
                var mailchimp = forms[ i ].classList.contains( 'avia-mailchimp-form' );
        
                if ( ! mailchimp ) {
                    var action = forms[ i ].getAttribute( 'action' );
                    forms[ i ].removeAttribute( 'action' );
                }
            
                if ( forms[ i ].classList && forms[ i ].classList.contains( 'av-form-recaptcha' ) && ! mailchimp ) {	
                    var submit = forms[ i ].querySelector( 'input[type="submit"]' );
                    var form_id = forms[ i ].getAttribute( 'data-avia-form-id' );
                    var sitekey = submit.getAttribute( 'data-sitekey' );
                    var notice = submit.getAttribute( 'data-notice' );
                    var size = submit.getAttribute( 'data-size' );
                    var theme = submit.getAttribute( 'data-theme' );
                    var tabindex = submit.getAttribute( 'data-tabindex' );
                    var version = submit.getAttribute( 'data-vn' );
                    var callback = submit.getAttribute( 'data-callback' );
                    var expired = submit.getAttribute( 'data-expired-callback' );
                    var label = $.aviaRecaptcha.aviaRecaptchaSetTokenName( forms[ i ], form_id );

                    submit.value = "Authenticating...";
            
                    $.aviaRecaptcha.aviaRecaptchaPlaceholder( submit, sitekey );
                    if( notice != null ) $.aviaRecaptcha.aviaRecaptchaNotice( submit, $.aviaRecaptcha.aviaRecaptchaTextDecode( notice ) );
                    $.aviaRecaptcha.aviaRecaptchaDetectHuman( forms[ i ], action );
                    
                    submit.classList.add( 'avia-button-default-style' );
        
                    $.aviaRecaptcha.aviaRecaptchaAlert( submit );
                    
                    var params = {
                        'sitekey': sitekey,
                        'size': size,
                        'theme': theme,
                        'tabindex': tabindex
                    };

                    if( version == 'v2') {   
                        var placeholder = forms[ i ].querySelector( '.g-recaptcha-widget' );

                        if( expired ) {
                            params[ 'callback' ] = expired;
                        }
        
                        if( callback ) {
                            params[ 'expired-callback' ] = callback;
                        } 

                        grecaptcha.render( placeholder, {
                            "sitekey" : params['sitekey'],
                            "theme" : params['theme'],
                            "size" : params['sitekey'],
                            "callback" : params['callback'],
                            "expired-callback" : params['expired-callback'],
                            "tabindex" : params['tabindex'],
                        });
                    }

                    if( version == 'v3' ) {
                        grecaptcha.execute( sitekey, { action: 'load' } ).then( function( token ) {            
                            $.aviaRecaptcha.aviaRecaptchaSuccess( token );                  
                        });
                    }
        
                    forms[ i ].setAttribute( 'data-widget-id', form_id );   
                    $.aviaRecaptcha.av_alien_alert_obj.push( label );          
                }
            }
        }
    }

    window.aviaRecaptchaCallback = $.aviaRecaptcha.aviaRecaptchaRender;
    window.aviaRecaptchaSuccess = $.aviaRecaptcha.aviaRecaptchaSuccess;
})(jQuery);



