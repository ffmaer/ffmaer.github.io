(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    return translateObjs[c[0x0]] = c, '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"buttonToggleFullscreen":"this.IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4","scrollBarMargin":2,"layout":"absolute","id":"rootPlayer","propagateClick":false,"backgroundColor":["#FFFFFF"],"data":{"history":{},"locales":{"en":"locale/en.txt"},"textToSpeechConfig":{"pitch":1,"speechOnInfoWindow":false,"volume":1,"stopBackgroundAudio":false,"speechOnTooltip":false,"rate":1,"speechOnQuizQuestion":false},"displayTooltipInTouchScreens":true,"defaultLocale":"en","name":"Player486"},"class":"Player","minHeight":20,"start":"this.init(); this.syncPlaylists([this.mainPlayList,this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839_playlist]); if(!this.get('fullscreenAvailable')) { [this.IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","gap":10,"minWidth":20,"scripts":{"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"getComponentByName":TDV.Tour.Script.getComponentByName,"isPanorama":TDV.Tour.Script.isPanorama,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"setMapLocation":TDV.Tour.Script.setMapLocation,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"clone":TDV.Tour.Script.clone,"initQuiz":TDV.Tour.Script.initQuiz,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"textToSpeech":TDV.Tour.Script.textToSpeech,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"openLink":TDV.Tour.Script.openLink,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"downloadFile":TDV.Tour.Script.downloadFile,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"executeJS":TDV.Tour.Script.executeJS,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"initAnalytics":TDV.Tour.Script.initAnalytics,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"getPixels":TDV.Tour.Script.getPixels,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"quizFinish":TDV.Tour.Script.quizFinish,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"historyGoBack":TDV.Tour.Script.historyGoBack,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"historyGoForward":TDV.Tour.Script.historyGoForward,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"mixObject":TDV.Tour.Script.mixObject,"getMediaByName":TDV.Tour.Script.getMediaByName,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"init":TDV.Tour.Script.init,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"getKey":TDV.Tour.Script.getKey,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"getMainViewer":TDV.Tour.Script.getMainViewer,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"resumePlayers":TDV.Tour.Script.resumePlayers,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"quizShowScore":TDV.Tour.Script.quizShowScore,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"startMeasurement":TDV.Tour.Script.startMeasurement,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"getOverlays":TDV.Tour.Script.getOverlays,"createTween":TDV.Tour.Script.createTween,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"enableVR":TDV.Tour.Script.enableVR,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"toggleVR":TDV.Tour.Script.toggleVR,"showPopupImage":TDV.Tour.Script.showPopupImage,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"showWindow":TDV.Tour.Script.showWindow,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"disableVR":TDV.Tour.Script.disableVR,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"playAudioList":TDV.Tour.Script.playAudioList,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"shareSocial":TDV.Tour.Script.shareSocial,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"quizStart":TDV.Tour.Script.quizStart,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"translate":TDV.Tour.Script.translate,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"cloneBindings":TDV.Tour.Script.cloneBindings,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"unregisterKey":TDV.Tour.Script.unregisterKey,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"existsKey":TDV.Tour.Script.existsKey,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"setValue":TDV.Tour.Script.setValue,"registerKey":TDV.Tour.Script.registerKey,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"setLocale":TDV.Tour.Script.setLocale},"scrollBarColor":"#000000","backgroundColorRatios":[0],"width":"100%","vrPolyfillScale":0.5,"height":"100%","defaultMenu":["fullscreen","mute","rotation"],"hash": "07516d05b19f3b843768fccf1c5f4db697d3bbe61ad129c085cf390ca972d7e7", "definitions": [{"click":"this.loadFromCurrentMediaPlayList(this.mainPlayList, 1, true)","id":"IconButton_3BF02F26_1C9E_990B_419B_60D4788D76C9","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"maxWidth":46,"maxHeight":46,"data":{"name":"-next"},"right":"1%","class":"IconButton","minHeight":1,"transparencyActive":true,"minWidth":1,"verticalAlign":"middle","top":"35%","bottom":"35%","width":92,"iconURL":"skin/IconButton_3BF02F26_1C9E_990B_419B_60D4788D76C9.png","visible":false,"horizontalAlign":"center"},{"scrollBarMargin":2,"layout":"absolute","overflow":"scroll","id":"Container_10BF264C_1C81_AB18_418E_C228A2BBA487","propagateClick":false,"backgroundOpacity":0.9,"maxWidth":800,"backgroundColor":["#534741"],"left":"1%","right":"1%","class":"Container","minHeight":1,"gap":10,"minWidth":1,"data":{"name":"SETTINGS"},"scrollBarColor":"#000000","backgroundColorRatios":[0],"bottom":20,"height":50,"children":["this.Container_1185BA07_1C82_BB09_4190_3425ACEF39CF","this.Container_12A55BC8_1C86_7918_419A_38D3F8B9FF36","this.Container_129084CF_1C83_AF18_418C_2D8031993BE6"]},{"scrollBarMargin":2,"layout":"horizontal","overflow":"scroll","id":"Container_1185BA07_1C82_BB09_4190_3425ACEF39CF","propagateClick":false,"backgroundOpacity":0,"left":"0%","class":"Container","minHeight":1,"minWidth":1,"verticalAlign":"middle","data":{"name":"Left"},"scrollBarColor":"#000000","top":"0%","width":"30%","height":"100%","paddingLeft":10,"children":["this.IconButton_11F8C692_1C82_6B0B_41B2_28931AB2B43D","this.IconButton_1297FF98_1C82_9907_41AD_A09E1EA44354"]},{"id":"effect_0D9B8AD4_1C86_9B08_41AD_E3E797295AC7","duration":200,"class":"FadeInEffect"},{"click":"this.loadFromCurrentMediaPlayList(this.mainPlayList, -1, true)","id":"IconButton_3BD6FE66_1C9E_9B08_41AE_65363919CAD0","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"maxWidth":46,"maxHeight":46,"left":"1%","class":"IconButton","minHeight":1,"transparencyActive":true,"minWidth":1,"verticalAlign":"middle","data":{"name":"-previous"},"top":"35%","bottom":"35%","width":92,"iconURL":"skin/IconButton_3BD6FE66_1C9E_9B08_41AE_65363919CAD0.png","visible":false,"horizontalAlign":"center"},{"pressedIconURL":"skin/IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396_pressed.png","id":"IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Right"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396.png","horizontalAlign":"center"},{"id":"ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839_playlist","items":[{"camera":"this.media_F30C39BD_FF26_9894_41C5_A1F41784D49C_camera","media":"this.media_F30C39BD_FF26_9894_41C5_A1F41784D49C","start":"this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839_playlist, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839_playlist, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer)","class":"Video360PlayListItem","player":"this.MainViewerPanoramaPlayer"}],"class":"PlayList"},{"click":"this.loadFromCurrentMediaPlayList(this.mainPlayList, -1, true)","pressedIconURL":"skin/IconButton_11F8C692_1C82_6B0B_41B2_28931AB2B43D_pressed.png","id":"IconButton_11F8C692_1C82_6B0B_41B2_28931AB2B43D","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Previous"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_11F8C692_1C82_6B0B_41B2_28931AB2B43D_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_11F8C692_1C82_6B0B_41B2_28931AB2B43D.png","horizontalAlign":"center"},{"click":"var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, this.effect_0D9B8AD4_1C86_9B08_41AD_E3E797295AC7, 'showEffect', false)}.bind(this); var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, this.effect_0D94FAD4_1C86_9B08_41A8_2DB4814C41C5, 'hideEffect', false)}.bind(this); if(!this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839.get('visible')){ visibleFunc(this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839) } else { invisibleFunc(this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839) }","pressedIconURL":"skin/IconButton_1297FF98_1C82_9907_41AD_A09E1EA44354_pressed.png","id":"IconButton_1297FF98_1C82_9907_41AD_A09E1EA44354","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Thumblist"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","mode":"toggle","rollOverIconURL":"skin/IconButton_1297FF98_1C82_9907_41AD_A09E1EA44354_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_1297FF98_1C82_9907_41AD_A09E1EA44354.png","horizontalAlign":"center"},{"id":"effect_3061B548_231D_5DCD_41B4_93FF66204E67","duration":100,"class":"FadeInEffect"},{"id":"mainPlayList","items":[{"camera":"this.media_F30C39BD_FF26_9894_41C5_A1F41784D49C_camera","media":"this.media_F30C39BD_FF26_9894_41C5_A1F41784D49C","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer)","class":"Video360PlayListItem","start":"this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)"}],"class":"PlayList"},{"scrollBarMargin":2,"layout":"horizontal","overflow":"scroll","id":"Container_12A55BC8_1C86_7918_419A_38D3F8B9FF36","propagateClick":false,"backgroundOpacity":0,"data":{"name":"Right"},"right":"0%","class":"Container","minHeight":1,"minWidth":1,"verticalAlign":"middle","scrollBarColor":"#000000","top":"0%","width":"30%","height":"100%","children":["this.IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4","this.IconButton_128BCB90_1C86_7907_41B3_46B5B135C181","this.IconButton_128B7B91_1C86_7909_41B8_9320D8E0D421"],"paddingRight":10,"horizontalAlign":"right"},{"id":"MainViewerPanoramaPlayer","touchControlMode":"drag_rotation","aaEnabled":true,"buttonCardboardView":"this.IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6","keepModel3DLoadedWithoutLocation":true,"mouseControlMode":"drag_rotation","viewerArea":"this.MainViewer","buttonMoveLeft":"this.IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44","class":"PanoramaPlayer","buttonMoveDown":"this.IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF","buttonZoomIn":"this.IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A","arrowKeysAction":"translate","displayPlaybackBar":true,"buttonZoomOut":"this.IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793","buttonMoveRight":"this.IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396","buttonMoveUp":"this.IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64"},{"initialPosition":{"pitch":0,"yaw":0,"class":"RotationalCameraPosition","hfov":120},"id":"media_F30C39BD_FF26_9894_41C5_A1F41784D49C_camera","enterPointingToHorizon":true,"class":"RotationalCamera"},{"toolTipBackgroundColor":"#F6F6F6","toolTipShadowColor":"#333333","id":"IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"maxWidth":46,"maxHeight":46,"data":{"name":"fullscreen"},"toolTipPaddingRight":6,"class":"IconButton","toolTipPaddingTop":4,"minHeight":1,"transparencyActive":true,"minWidth":1,"verticalAlign":"middle","toolTipFontFamily":"Arial","mode":"toggle","toolTipPaddingBottom":4,"toolTip":trans('IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4.toolTip'),"rollOverIconURL":"skin/IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4_rollover.png","toolTipBorderColor":"#767676","width":46,"height":46,"iconURL":"skin/IconButton_138AC8EB_1C81_A718_41B9_C0E861AF42F4.png","toolTipFontColor":"#606060","toolTipTextShadowColor":"#000000","toolTipPaddingLeft":6,"horizontalAlign":"center"},{"pressedIconURL":"skin/IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44_pressed.png","id":"IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Left"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44.png","horizontalAlign":"center"},{"toolTipBackgroundColor":"#F6F6F6","itemThumbnailShadowOpacity":0.54,"scrollBarMargin":0,"paddingTop":10,"itemLabelFontFamily":"Arial","itemLabelFontSize":"12px","itemBackgroundOpacity":0,"backgroundOpacity":0.9,"itemPaddingTop":3,"itemLabelFontWeight":"normal","left":"1%","toolTipPaddingRight":6,"right":"1%","class":"ThumbnailList","toolTipPaddingTop":4,"data":{"name":"THUMBNAIL LIST"},"gap":10,"scrollBarOpacity":0,"selectedItemBorderSize":2,"toolTipFontFamily":"Arial","itemLabelFontColor":"#999999","selectedItemLabelFontColor":"#FFFFFF","scrollBarColor":"#FFFFFF","backgroundColorRatios":[0],"itemBorderRadius":0,"toolTipBorderColor":"#767676","itemLabelTextDecoration":"none","itemThumbnailShadowBlurRadius":8,"toolTipFontColor":"#606060","paddingLeft":14,"itemBackgroundColorDirection":"vertical","itemBackgroundColorRatios":[],"toolTipTextShadowColor":"#000000","paddingRight":14,"selectedItemLabelFontWeight":"bold","toolTipShadowColor":"#333333","rollOverItemLabelFontWeight":"normal","itemLabelFontStyle":"normal","layout":"horizontal","itemThumbnailBorderRadius":0,"id":"ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839","propagateClick":false,"itemThumbnailScaleMode":"fit_outside","maxWidth":800,"backgroundColor":["#534741"],"tabIndex":0,"minHeight":20,"minWidth":20,"selectedItemBackgroundOpacity":0.9,"itemThumbnailShadowColor":"#000000","itemThumbnailOpacity":1,"itemLabelGap":8,"itemThumbnailWidth":120,"itemThumbnailHeight":70,"selectedItemBackgroundColorRatios":[0],"scrollBarWidth":5,"playList":"this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839_playlist","itemPaddingLeft":3,"toolTipPaddingBottom":4,"itemPaddingBottom":3,"bottom":70,"rollOverItemBackgroundOpacity":0,"itemBackgroundColor":[],"rollOverItemLabelFontColor":"#FFFFFF","itemPaddingRight":3,"selectedItemBackgroundColor":["#534741"],"itemThumbnailShadowSpread":1,"toolTipPaddingLeft":6,"itemThumbnailShadow":false,"selectedItemBorderColor":"#FFFFFF"},{"pressedIconURL":"skin/IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A_pressed.png","id":"IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Zoom In"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A.png","horizontalAlign":"center"},{"pressedIconURL":"skin/IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793_pressed.png","id":"IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Zoom Out"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793.png","horizontalAlign":"center"},{"scrollBarMargin":2,"layout":"horizontal","overflow":"scroll","id":"Container_129084CF_1C83_AF18_418C_2D8031993BE6","propagateClick":false,"backgroundOpacity":0,"left":"25%","right":"25%","class":"Container","minHeight":1,"minWidth":1,"verticalAlign":"middle","data":{"name":"Center"},"scrollBarColor":"#000000","top":"0%","height":"100%","children":["this.IconButton_12B3BCE7_1C81_BF08_41BC_218123CBBD44","this.IconButton_12D5DAF7_1C9E_BB08_416D_19DFFACBC396","this.IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64","this.IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF","this.IconButton_12FEFBA0_1C9E_9908_41B1_DC24C660435A","this.IconButton_138E31DC_1C9E_A93F_4194_059FF78E4793","this.IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6"],"horizontalAlign":"center"},{"id":"effect_0A30489F_1C86_6738_41A8_2722230A2E2F","duration":100,"class":"FadeOutEffect"},{"id":"effect_0D94FAD4_1C86_9B08_41A8_2DB4814C41C5","duration":200,"class":"FadeOutEffect"},{"pressedIconURL":"skin/IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6_pressed.png","id":"IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"maxWidth":46,"maxHeight":46,"data":{"name":"VR"},"class":"IconButton","minHeight":1,"transparencyActive":true,"minWidth":1,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_124E5997_1C81_F908_41A5_4F230AEBB3C6.png","horizontalAlign":"center"},{"click":"var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, null, 'showEffect', false)}.bind(this); visibleFunc(this.Container_10BF264C_1C81_AB18_418E_C228A2BBA487); var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, this.effect_307F1ACA_231D_F4CC_41B6_DE1D97EDB043, 'hideEffect', false)}.bind(this); invisibleFunc(this.IconButton_3BD6FE66_1C9E_9B08_41AE_65363919CAD0); invisibleFunc(this.IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8); invisibleFunc(this.IconButton_3BF02F26_1C9E_990B_419B_60D4788D76C9)","id":"IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"maxWidth":46,"maxHeight":46,"left":"40%","right":"40%","class":"IconButton","minHeight":1,"transparencyActive":true,"minWidth":1,"verticalAlign":"middle","data":{"name":"-Expand"},"bottom":0,"rollOverIconURL":"skin/IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8_rollover.png","height":46,"iconURL":"skin/IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8.png","visible":false,"horizontalAlign":"center"},{"id":"effect_307F1ACA_231D_F4CC_41B6_DE1D97EDB043","duration":100,"class":"FadeOutEffect"},{"pressedIconURL":"skin/IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF_pressed.png","id":"IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Down"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_138A1D06_1C9E_7908_41BC_00628ACDA5FF.png","horizontalAlign":"center"},{"toolTipBackgroundColor":"#F6F6F6","playbackBarHeadHeight":15,"playbackBarHeadShadowColor":"#000000","subtitlesTextShadowOpacity":1,"playbackBarHeadBorderSize":0,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarProgressBackgroundColorRatios":[0],"vrPointerColor":"#FFFFFF","subtitlesBackgroundOpacity":0.2,"progressBarBackgroundColor":["#3399FF"],"progressBorderColor":"#000000","toolTipPaddingRight":6,"playbackBarBorderColor":"#FFFFFF","playbackBarBackgroundOpacity":1,"class":"ViewerArea","toolTipPaddingTop":4,"playbackBarHeadShadow":true,"playbackBarBorderRadius":0,"subtitlesFontFamily":"Arial","subtitlesTop":0,"toolTipFontSize":"1.11vmin","playbackBarProgressBorderColor":"#000000","subtitlesBorderColor":"#FFFFFF","surfaceReticleSelectionColor":"#FFFFFF","toolTipFontFamily":"Arial","firstTransitionDuration":0,"vrPointerSelectionTime":2000,"progressBackgroundColor":["#FFFFFF"],"playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarHeadBorderRadius":0,"toolTipBorderColor":"#767676","vrThumbstickRotationStep":20,"subtitlesFontColor":"#FFFFFF","toolTipFontColor":"#606060","playbackBarHeadBorderColor":"#000000","playbackBarBorderSize":0,"playbackBarBottom":5,"progressBottom":0,"toolTipTextShadowColor":"#000000","progressHeight":10,"toolTipShadowColor":"#333333","playbackBarBackgroundColor":["#FFFFFF"],"progressBorderSize":0,"data":{"name":"Main Viewer"},"playbackBarHeight":10,"progressBarBorderRadius":0,"id":"MainViewer","subtitlesTextShadowHorizontalLength":1,"propagateClick":false,"progressBarBorderSize":0,"subtitlesGap":0,"subtitlesTextShadowColor":"#000000","minHeight":50,"subtitlesBackgroundColor":"#000000","minWidth":100,"progressBorderRadius":0,"playbackBarHeadWidth":6,"playbackBarProgressBorderSize":0,"playbackBarBackgroundColorDirection":"vertical","subtitlesTextShadowVerticalLength":1,"playbackBarRight":0,"progressRight":0,"toolTipPaddingBottom":4,"subtitlesFontSize":"3vmin","playbackBarProgressBorderRadius":0,"progressBackgroundColorRatios":[0],"playbackBarProgressBackgroundColor":["#3399FF"],"progressBarBorderColor":"#000000","vrPointerSelectionColor":"#FF6600","height":"100%","progressLeft":0,"playbackBarHeadShadowBlurRadius":3,"progressBarBackgroundColorRatios":[0],"playbackBarHeadShadowOpacity":0.7,"surfaceReticleColor":"#FFFFFF","subtitlesBottom":50,"toolTipPaddingLeft":6,"playbackBarLeft":0,"width":"100%"},{"click":"this.loadFromCurrentMediaPlayList(this.mainPlayList, 1, true)","pressedIconURL":"skin/IconButton_128B7B91_1C86_7909_41B8_9320D8E0D421_pressed.png","id":"IconButton_128B7B91_1C86_7909_41B8_9320D8E0D421","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Next"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_128B7B91_1C86_7909_41B8_9320D8E0D421_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_128B7B91_1C86_7909_41B8_9320D8E0D421.png","horizontalAlign":"center"},{"pressedIconURL":"skin/IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64_pressed.png","id":"IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Up"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_11799103_1C9E_A909_418E_09A8EA6A7B64.png","horizontalAlign":"center"},{"click":"var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, this.effect_0A30489F_1C86_6738_41A8_2722230A2E2F, 'hideEffect', false)}.bind(this); invisibleFunc(this.Container_10BF264C_1C81_AB18_418E_C228A2BBA487); invisibleFunc(this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839); var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, this.effect_3061B548_231D_5DCD_41B4_93FF66204E67, 'showEffect', false)}.bind(this); visibleFunc(this.IconButton_3BD6FE66_1C9E_9B08_41AE_65363919CAD0); visibleFunc(this.IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8); visibleFunc(this.IconButton_3BF02F26_1C9E_990B_419B_60D4788D76C9)","pressedIconURL":"skin/IconButton_128BCB90_1C86_7907_41B3_46B5B135C181_pressed.png","id":"IconButton_128BCB90_1C86_7907_41B3_46B5B135C181","propagateClick":false,"tabIndex":0,"backgroundOpacity":0,"data":{"name":"Collapse"},"class":"IconButton","minHeight":0,"transparencyActive":true,"minWidth":0,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_128BCB90_1C86_7907_41B3_46B5B135C181_rollover.png","width":46,"height":46,"iconURL":"skin/IconButton_128BCB90_1C86_7907_41B3_46B5B135C181.png","horizontalAlign":"center"},{"hfovMax":140,"id":"media_F30C39BD_FF26_9894_41C5_A1F41784D49C","hfov":360,"vfov":180,"video":["this.videores_F2DB534D_FF26_89F4_41A2_6CE52F1A359E"],"pitch":0,"thumbnailUrl":"media/media_F30C39BD_FF26_9894_41C5_A1F41784D49C_t.webp","class":"Video360","hfovMin":60,"label":trans('media_F30C39BD_FF26_9894_41C5_A1F41784D49C.label'),"data":{"label":"Vnull"}},{"height":1024,"codec":"h264","posterURL":trans('videores_F2DB534D_FF26_89F4_41A2_6CE52F1A359E.posterURL'),"bitrate":5028,"class":"Video360Resource","type":"video/mp4","url":trans('videores_F2DB534D_FF26_89F4_41A2_6CE52F1A359E.url'),"framerate":29.97,"id":"videores_F2DB534D_FF26_89F4_41A2_6CE52F1A359E","width":2048}],"children":["this.MainViewer","this.Container_10BF264C_1C81_AB18_418E_C228A2BBA487","this.ThumbnailList_0CDB6BB1_1C82_7909_41B3_97C8C377A839","this.IconButton_069AFCF9_1C9E_98F8_41AA_EDF2EF9939E8","this.IconButton_3BD6FE66_1C9E_9B08_41AE_65363919CAD0","this.IconButton_3BF02F26_1C9E_990B_419B_60D4788D76C9"]};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.1.38, Mon Oct 20 2025