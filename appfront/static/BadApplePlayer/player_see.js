jQuery['cookie'] = function(a, b, c) {
	if (typeof b != 'undefined') {
		c = c || {};
		if (b === null) {
			b = '';
			c['expires'] = -0x1
		};
		var d = '';
		if (c['expires'] && (typeof c['expires'] == 'number' || c['expires']['toUTCString'])) {
			var e;
			if (typeof c['expires'] == 'number') {
				e = new Date();
				e['setTime'](e['getTime']() + c['expires'] * 0x18 * 0x3c * 0x3c * 1e3)
			} else {
				e = c['expires']
			};
			d = '; expires=' + e['toUTCString']()
		};
		var f = c['path'] ? '; path=' + c['path'] : '';
		var g = c['domain'] ? '; domain=' + c['domain'] : '';
		var h = c['secure'] ? '; secure' : '';
		window['document']['cookie'] = [a, '=', encodeURIComponent(b), d, f, g, h]['join']('')
	} else {
		var j = null;
		if (window['document']['cookie'] && window['document']['cookie'] != '') {
			var k = window['document']['cookie']['split'](';');
			for (var i = 0x0; i < k['length']; i++) {
				var l = jQuery['trim'](k[i]);
				if (l['substring'](0x0, a['length'] + 0x1) == a + '=') {
					j = decodeURIComponent(l['substring'](a['length'] + 0x1));
					break
				}
			}
		};
		return j
	}
};
var wenkmList;
if (navigator['userAgent']['match'](/(iPhone|iPod|Android|ios)/i)) {
	$('#wenkmPlayer')['hide']()
} else {
	if (top['location'] != self['location']) {
		$('#wenkmPlayer')['hide']()
	} else {
		homeurl = 'http://myhk.xlch520.cn/api/';

		wyapi = homeurl + 'music.php?do=parse&type=wy';
		xmapi = homeurl + 'music.php?do=parse&type=xm';
		qqapi = homeurl + 'music.php?do=parse&type=qq';

		wylrc = homeurl + 'music.php?do=lyric&type=wy';
		qqlrc = homeurl + 'music.php?do=lyric&type=qq';
		colorapi = homeurl + 'music.php?do=color';
		fileurl = 'http://myhk.xlch520.cn/music.php?Key='+XlchKey;
		if (geci != '1') {
			songFrom33 = '关闭', hasgeci = false
		} else {
			songFrom33 = '开启', hasgeci = true
		};
		if (random != '1') {
			random = false
		} else {
			random = true
		};
		var audio = new Audio(),
			$player = $('#wenkmPlayer'),
			$tips = $('#wenkmTips'),
			$lk = $('#wenkmKsc,#wenkmLrc'),
			$player1 = $('.switch-player', $player),
			$btns = $('.status', $player),
			$songName = $('.song', $player),
			$cover = $('.cover', $player),
			$songTime = $('.time', $player),
			$songList = $('.song-list .list', $player);
		$albumList = $('.album-list', $player), $songFrom = $('.player .artist', $player), $songFrom1 = $('.player .artist1', $player), $songFrom2 = $('.player .moshi', $player), $songFrom3 = $('.player .geci', $player), $songFrom4 = $('.player .switch-ksclrc', $player), $songFrom5 = $('.player .switch-down', $player), songFrom44 = '', songFrom55 = '', roundcolor = '#6c6971', lightcolor = '#81c300', cur = 'current', volume = $['cookie']('myhk_player_volume') ? $['cookie']('myhk_player_volume') : '.55', albumId = 0x0, songId = 0x0, songTotal = 0x0, showLrc = true, ycgeci = true, hasdefault = false, musicfirsttip = false;

		function wenkmCicle() {
			$songTime['text'](formatSecond(audio['currentTime']) + ' / ' + formatSecond(audio['duration']));
			if (audio['currentTime'] < audio['duration'] / 0x2) {
				$btns['css']('background-image', 'linear-gradient(90deg, ' + roundcolor + ' 50%, transparent 50%, transparent), linear-gradient(' + (0x5a + (0x10e - 0x5a) / (audio['duration'] / 0x2) * audio['currentTime']) + 'deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
			} else {
				$btns['css']('background-image', 'linear-gradient(' + (0x5a + (0x10e - 0x5a) / (audio['duration'] / 0x2) * audio['currentTime']) + 'deg, ' + lightcolor + ' 50%, transparent 50%, transparent), linear-gradient(270deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
			}
		};

		function formatSecond(t) {
			return ('00' + Math['floor'](t / 0x3c))['substr'](-0x2) + ':' + ('00' + Math['floor'](t % 0x3c))['substr'](-0x2)
		};
		var cicleTime = null;
		$cover['html']('<img src="http://myhk.xlch520.cn/api/default.png">');
		$songName['html']('<a style="color:#f00">初始化失败</a>');
		$songFrom['html']('<a href="http://myhk.xlch520.cn" title="绚丽彩虹" target="_blank" style="color:#f00">By.绚丽彩虹</a>');
		$songFrom1['html']('<a style="color:#f00">音乐播放器</a>');
		$songFrom3['html']('<i class="fa fa-times-circle"></i> 歌词未载入');
		$player['css']({
			background: '#38343e'
		});
		$player1['css']({
			background: '#38343e'
		});
		$tips['css']({
			background: '#38343e'
		});
		$lk['css']({
			background: '#38343e'
		});
		var wenkmMedia = {
			play: function() {
				$player['addClass']('playing');
				cicleTime = setInterval(wenkmCicle, 0x320);
				if (hasLrc) {
					lrcTime = setInterval(wenkmLrc['lrc']['play'], 0x1f4);
					$('#wenkmLrc')['addClass']('show');
					$('.switch-down')['css']('right', '65px');
					$('.switch-default')['css']('right', '95px');
					if (hasdefault) {
						setTimeout(function() {
							$('.switch-ksclrc')['show']()
						}, 0x12c)
					} else {
						$('.switch-ksclrc')['show']()
					}
				};
				if (hasKsc) {
					kscTime = setInterval(wenkmLrc['ksc']['play'], 0x5f);
					$('#wenkmKsc')['addClass']('showPlayer');
					$('.switch-down')['css']('right', '65px');
					$('.switch-default')['css']('right', '95px');
					if (hasdefault) {
						setTimeout(function() {
							$('.switch-ksclrc')['show']()
						}, 0x12c)
					} else {
						$('.switch-ksclrc')['show']()
					}
				}
			},
			pause: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				$('.switch-ksclrc')['hide']();
				$('.switch-down')['css']('right', '35px');
				$('.switch-default')['css']('right', '65px');
				if (hasLrc) {
					wenkmLrc['lrc']['hide']()
				};
				if (hasKsc) {
					wenkmLrc['ksc']['hide']()
				}
			},
			error: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				wenkmTips['show'](wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - 资源获取失败！');
				setTimeout(function() {
					$cover['removeClass']('coverplay')
				}, 1e3);
				$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
			},
			seeking: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				wenkmTips['show']('加载中...')
			},
			volumechange: function() {
				var a = window['parseInt'](audio['volume'] * 0x64);
				$('.volume-on', $player)['width'](a + '%');
				wenkmTips['show']('音量：' + a + '%')
			},
			getInfos: function(a) {
				$cover['removeClass']('coverplay');
				$songFrom5['hide']();
				songId = a;
				if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
					songFrom55 = '网易音乐';
					phpurl = wyapi;
					netmusic()
				} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('xm') >= 0x0) {
					songFrom55 = '虾米音乐';
					phpurl = xmapi;
					netmusic()
				}else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('qq') >= 0x0) {
					songFrom55 = 'QQ音乐';
					phpurl = qqapi;
					netmusic()
				} else {
					songFrom55 = '解析失败';
				}
			},
			getSongId: function(n) {
				return n >= songTotal ? 0x0 : n < 0x0 ? songTotal - 0x1 : n
			},
			next: function() {
				if (random) {
					wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
				} else {
					wenkmMedia['getInfos'](wenkmMedia['getSongId'](songId + 0x1))
				}
			},
			prev: function() {
				if (random) {
					wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
				} else {
					wenkmMedia['getInfos'](wenkmMedia['getSongId'](songId - 0x1))
				}
			}
		};
		var wenkmTipsTime = null;
		var wenkmTips = {
			show: function(a) {
				clearTimeout(wenkmTipsTime);
				$('#wenkmTips')['text'](a)['addClass']('show');
				this['hide']()
			},
			hide: function() {
				wenkmTipsTime = setTimeout(function() {
					$('#wenkmTips')['removeClass']('show');
					if (musicfirsttip == false) {
						musicfirsttip = true;
						if (welcome == '1') {
							wenkmTips['show'](tips)
						}
					}
				}, 4e3)
			}
		};
		audio['addEventListener']('play', wenkmMedia['play'], false);
		audio['addEventListener']('pause', wenkmMedia['pause'], false);
		audio['addEventListener']('ended', wenkmMedia['next'], false);
		audio['addEventListener']('playing', wenkmMedia['playing'], false);
		audio['addEventListener']('volumechange', wenkmMedia['volumechange'], false);
		audio['addEventListener']('error', wenkmMedia['error'], false);
		audio['addEventListener']('seeking', wenkmMedia['seeking'], false);
		$player1['click'](function() {
			$player['toggleClass']('show')
		});
		$(function() {
			window['RootCookies'] = {};
			window['RootCookies']['SetCookie'] = function(a, b, c) {
				var d = new Date();
				d['setTime'](d['getTime']() + 864e5 * c);
				window['document']['cookie'] = a + '=' + window['escape'](b) + (null == c ? '' : ';expires=' + d['toGMTString']()) + ';path=/'
			}
		});
		$('.pause', $player)['click'](function() {
			hasgeci = false;
			$('li', $albumList)['eq'](albumId)['addClass'](cur)['find']('.artist')['html']('暂停播放 > ')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']();
			wenkmTips['show']('暂停播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
			setTimeout(function() {
				wenkmTips['show']('播放器下次访问将停止播放')
			}, 4e3);
			$cover['removeClass']('coverplay');
			RootCookies['SetCookie']('myhk_player', 'no', 0x1e);
			audio['pause']()
		});
		$('.play', $player)['click'](function() {
			hasgeci = true;
			RootCookies['SetCookie']('myhk_player', 'no', -0x1);
			auto = '';
			$('#wenkmLrc,#wenkmKsc')['show']();
			$('li', $albumList)['eq'](albumId)['addClass'](cur)['find']('.artist')['html']('当前播放 > ')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']();
			wenkmTips['show']('开始从' + songFrom55 + '播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
			setTimeout(function() {
				wenkmTips['show']('播放器下次访问将自动播放')
			}, 4e3);
			$cover['addClass']('coverplay');
			audio['play']()
		});
		$('.prev', $player)['click'](function() {
			RootCookies['SetCookie']('myhk_player', 'no', -0x1);
			hasgeci = true;
			auto = '';
			$('#wenkmLrc,#wenkmKsc')['show']();
			wenkmMedia['prev']();
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']()
		});
		$('.next', $player)['click'](function() {
			RootCookies['SetCookie']('myhk_player', 'no', -0x1);
			hasgeci = true;
			auto = '';
			$('#wenkmLrc,#wenkmKsc')['show']();
			wenkmMedia['next']();
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']()
		});
		$('.random', $player)['click'](function() {
			$(this)['addClass'](cur);
			$('.loop', $player)['removeClass'](cur);
			random = true;
			wenkmTips['show']('随机播放');
			$songFrom2['html']('<i class="random fa fa-random current"></i> 随机播放')
		});
		$('.loop', $player)['click'](function() {
			$(this)['addClass'](cur);
			$('.random', $player)['removeClass'](cur);
			random = false;
			wenkmTips['show']('顺序播放');
			$songFrom2['html']('<i class="loop fa fa-retweet"></i> 顺序播放')
		});
		var $progress = $('.progress', $player);
		$progress['click'](function(e) {
			var a = $progress['width'](),
				progressOffsetLeft = $progress['offset']()['left'];
			volume = (e['clientX'] - progressOffsetLeft) / a;
			$['cookie']('myhk_player_volume', volume, {
				path: '/',
				expires: 0x0
			});
			audio['volume'] = volume
		});
		var isDown = false;
		$('.drag', $progress)['mousedown'](function() {
			isDown = true;
			$('.volume-on', $progress)['removeClass']('ts5')
		});
		$(window)['on']({
			mousemove: function(e) {
				if (isDown) {
					var a = $progress['width'](),
						progressOffsetLeft = $progress['offset']()['left'],
						eClientX = e['clientX'];
					if (eClientX >= progressOffsetLeft && eClientX <= progressOffsetLeft + a) {
						$('.volume-on', $progress)['width']((eClientX - progressOffsetLeft) / a * 0x64 + '%');
						volume = (eClientX - progressOffsetLeft) / a;
						audio['volume'] = volume
					}
				}
			},
			mouseup: function() {
				isDown = false;
				$('.volume-on', $progress)['addClass']('ts5')
			}
		});
		$('.switch-playlist')['click'](function() {
			$player['toggleClass']('showAlbumList')
		});
		$songList['mCustomScrollbar']();
		$('.song-list .musicheader,.song-list .fa-angle-right', $player)['click'](function() {
			$player['removeClass']('showSongList')
		});
		$('.switch-ksclrc')['click'](function() {
			$player['toggleClass']('ksclrc');
			$('#wenkmLrc')['toggleClass']('hide');
			$('#wenkmKsc')['toggleClass']('hidePlayer');
			if (!$('#wenkmLrc')['hasClass']('hide')) {
				ycgeci = true;
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词开启')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Ksc歌词开启')
				};
				wenkmTips['show']('开启歌词显示');
				songFrom33 = '开启', $songFrom4['html']('<i class="fa fa-toggle-on" title="关闭歌词"></i>')
			} else {
				ycgeci = false;
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-times-circle"></i> Lrc歌词关闭')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-times-circle"></i> Ksc歌词关闭')
				};
				wenkmTips['show']('歌词显示已关闭');
				songFrom33 = '关闭', $songFrom4['html']('<i class="fa fa-toggle-off" title="打开歌词"></i>')
			};
			musictooltip()
		});
		$('.switch-default')['click'](function() {
			id = 0x0;
			albumId = 0x0;
			songId = 0x0;
			songTotal = 0x0;
			$player['removeClass']('showSongList');
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
			$['ajax']({
				url: fileurl,
				type: 'GET',
				dataType: 'script',
				success: function() {
					wenkmTips['show'](wenkmList[albumId]['song_album'] + ' - 载入成功!');
					$('.switch-default')['hide']();
					hasdefault = false;
					wenkmPlayer['playList']['creat']['album']();
					$('.play', $player)['click']()
				},
				error: function(a, b, c) {
					wenkmTips['show']('歌曲列表获取失败!');
					$('.switch-default')['show']()
				}
			})
		});
		$['ajax']({
			url: fileurl,
			type: 'GET',
			dataType: 'script',
			success: function() {
				wenkmPlayer['playList']['creat']['album']()
			},
			error: function(a, b, c) {
				wenkmTips['show']('歌曲列表获取失败!')
			}
		});
		wenkmPlayer['newplayList'] = {
			creat: {
				album: function() {
					var b = wenkmList['length'],
						albumList = '';
					$('.musicheader', $albumList)['text'](name + '(' + b + ')');
					for (var i = 0x0; i < b; i++) {
						albumList += '<li><i class="fa fa-angle-right"></i><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[i]['song_album'] + ' - ' + wenkmList[i]['song_album1'] + '</li>'
					};
					$('.list', $albumList)['html']('<ul>' + albumList + '</ul>')['mCustomScrollbar']();
					$('li', $albumList)['click'](function() {
						var a = $(this)['index']();
						if ($(this)['hasClass'](cur)) {
							wenkmPlayer['newplayList']['creat']['song'](a, true)
						} else {
							wenkmPlayer['newplayList']['creat']['song'](a, false)
						};
						$player['addClass']('showSongList')
					});
					songTotal = wenkmList[albumId]['song_id']['length']
				},
				song: function(a, b) {
					songTotal = wenkmList[a]['song_id']['length'];
					var c = '';
					$('.song-list .musicheader span', $player)['text'](wenkmList[a]['song_album'] + '(' + songTotal + ')');
					for (var i = 0x0; i < songTotal; i++) {
						c += '<li><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[a]['song_name'][i]['replace'](i + 0x1 + '#', '') + '</li>'
					};
					$('ul', $songList)['html'](c);
					$songList['attr']('data-album', a);
					$songList['mCustomScrollbar']('update');
					if (b) {
						$('li', $songList)['eq'](songId)['addClass'](cur)['siblings']()['removeClass'](cur);
						$songList['mCustomScrollbar']('scrollTo', $('li.current', $songList)['position']()['top'] - 0x78)
					} else {
						$songList['mCustomScrollbar']('scrollTo', 'top')
					};
					$('li', $songList)['click'](function() {
						hasgeci = true;
						auto = '';
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
						albumId = a;
						if ($(this)['hasClass'](cur)) {
							$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
							wenkmTips['show']('正在播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''))
						} else {
							RootCookies['SetCookie']('myhk_player', 'no', -0x1);
							$(this)['addClass'](cur)['siblings']()['removeClass'](cur);
							songId = $(this)['index']();
							wenkmMedia['getInfos'](songId)
						}
					})
				}
			}
		};
		wenkmPlayer['playList'] = {
			creat: {
				album: function() {
					var b = wenkmList['length'],
						albumList = '';
					$('.musicheader', $albumList)['text'](name + '(' + b + ')');
					for (var i = 0x0; i < b; i++) {
						albumList += '<li><i class="fa fa-angle-right"></i><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[i]['song_album'] + ' - ' + wenkmList[i]['song_album1'] + '</li>'
					};
					$('.list', $albumList)['html']('<ul>' + albumList + '</ul>')['mCustomScrollbar']();
					$('li', $albumList)['click'](function() {
						var a = $(this)['index']();
						if ($(this)['hasClass'](cur)) {
							wenkmPlayer['playList']['creat']['song'](a, true)
						} else {
							wenkmPlayer['playList']['creat']['song'](a, false)
						};
						$player['addClass']('showSongList')
					});
					songTotal = wenkmList[albumId]['song_id']['length'];
					if (random) {
						wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
					} else {
						wenkmMedia['getInfos'](wenkmMedia['getSongId'](songId))
					}
				},
				song: function(a, b) {
					songTotal = wenkmList[a]['song_id']['length'];
					var c = '';
					$('.song-list .musicheader span', $player)['text'](wenkmList[a]['song_album'] + '(' + songTotal + ')');
					for (var i = 0x0; i < songTotal; i++) {
						c += '<li><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[a]['song_name'][i]['replace'](i + 0x1 + '#', '') + '</li>'
					};
					$('ul', $songList)['html'](c);
					$songList['attr']('data-album', a);
					$songList['mCustomScrollbar']('update');
					if (b) {
						$('li', $songList)['eq'](songId)['addClass'](cur)['siblings']()['removeClass'](cur);
						$songList['mCustomScrollbar']('scrollTo', $('li.current', $songList)['position']()['top'] - 0x78)
					} else {
						$songList['mCustomScrollbar']('scrollTo', 'top')
					};
					$('li', $songList)['click'](function() {
						hasgeci = true;
						auto = '';
						$('#wenkmLrc,#wenkmKsc')['show']();
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
						albumId = a;
						if ($(this)['hasClass'](cur)) {
							$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
							wenkmTips['show']('正在播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''))
						} else {
							RootCookies['SetCookie']('myhk_player', 'no', -0x1);
							$(this)['addClass'](cur)['siblings']()['removeClass'](cur);
							songId = $(this)['index']();
							wenkmMedia['getInfos'](songId)
						}
					})
				}
			}
		};
		var hasLrc = false,
			hasKsc = false,
			kscLineNow1 = false,
			kscLineNow2 = false,
			lrcTimeLine = [],
			lrcHeight = $('#wenkmLrc')['height'](),
			lrcTime = null,
			kscTime = null,
			letterTime1 = null,
			letterTime2 = null,
			lrcCont = '',
			kscCont = '',
			tempNum1 = 0x0,
			tempNum2 = 0x0;
		var wenkmLrc = {
			load: function() {
				if (!hasgeci) {
					$player['addClass']('ksclrc');
					$('#wenkmLrc')['addClass']('hide');
					$('#wenkmKsc')['addClass']('hidePlayer')
				};
				wenkmLrc['lrc']['hide']();
				wenkmLrc['ksc']['hide']();
				hasLrc = false;
				hasKsc = false;
				$('#wenkmLrc,#wenkmKsc')['html']('');
							$('.switch-ksclrc')['hide']();
							$('.switch-down')['css']('right', '35px');
							$('.switch-default')['css']('right', '65px');
							if (hasgeci) {
								$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词' + songFrom33)
							} else {
								$songFrom3['html']('<i class="fa fa-times-circle"></i> Lrc歌词' + songFrom33)
							};
							$('.switch-down')['css']('right', '65px');
							$('.switch-default')['css']('right', '95px');
							if (hasdefault) {
								setTimeout(function() {
									$('.switch-ksclrc')['show']()
								}, 0x12c)
							} else {
								$('.switch-ksclrc')['show']()
							};
							if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0 || wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('qq') >= 0x0) {
								$['ajax']({
									url: lrcurl,
									type: 'GET',
									dataType: 'script',
									data: {

										lrc: wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['replace']('wy', ''),


									},
									success: function() {
										if (typeof cont == 'undefined') {
											songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
											$('.switch-ksclrc')['hide']();
											$('.switch-down')['css']('right', '35px');
											$('.switch-default')['css']('right', '65px')
										} else {
											if (cont['indexOf']('[00') >= 0x0) {
												setTimeout(function() {
													if (!$('#wenkmLrc')['hasClass']('hide')) {
														songFrom44 = ' - Lrc歌词获取成功!'
													} else {
														songFrom44 = ' - Lrc歌词已关闭！'
													};
													wenkmLrc['lrc']['format'](cont)
												}, 0x1f4)
											} else {
												songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
												$('.switch-ksclrc')['hide']();
												$('.switch-down')['css']('right', '35px');
												$('.switch-default')['css']('right', '65px')
											}
										}
									}
								})
							} else {
								$['ajax']({
									url: lrcurl,
									cache: false,
									dataType: 'text',
									success: function(a) {
										if (typeof a == 'undefined') {
											songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
											$('.switch-ksclrc')['hide']();
											$('.switch-down')['css']('right', '35px');
											$('.switch-default')['css']('right', '65px')
										} else {
											if (a['indexOf']('[00') >= 0x0) {
												setTimeout(function() {
													if (!$('#wenkmLrc')['hasClass']('hide')) {
														songFrom44 = ' - Lrc歌词获取成功!'
													} else {
														songFrom44 = ' - Lrc歌词已关闭！'
													};
													wenkmLrc['lrc']['format'](a)
												}, 0x1f4)
											} else {
												songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
												$('.switch-ksclrc')['hide']();
												$('.switch-down')['css']('right', '35px');
												$('.switch-default')['css']('right', '65px')
											}
										}
									},
									error: function() {
										songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
										$('.switch-ksclrc')['hide']();
										$('.switch-down')['css']('right', '35px');
										$('.switch-default')['css']('right', '65px')
									}
								})
							}
			},
			lrc: {
				format: function(b) {
					hasLrc = true;

					function formatTime(t) {
						var a = t['split'](':'),
							min = +a[0x0],
							sec = +a[0x1]['split']('.')[0x0],
							ksec = +a[0x1]['split']('.')[0x1];
						return min * 0x3c + sec + Math['round'](ksec / 1e3)
					};
					var c = b['replace'](/\[[A-Za-z]+:(.*?)]/g, '')['split'](/[\]\[]/g),
						lrcLine = '';
					lrcTimeLine = [];
					for (var i = 0x1; i < c['length']; i += 0x2) {
						var d = formatTime(c[i]);
						lrcTimeLine['push'](d);
						if (i == 0x1) {
							lrcLine += '<li class="wenkmLrc' + d + ' current">' + c[i + 0x1]['replace']('\n', '') + '</li>'
						} else {
							lrcLine += '<li class="wenkmLrc' + d + '">' + c[i + 0x1]['replace']('\n', '') + '</li>'
						}
					};
					$('#wenkmLrc')['html']('<ul>' + lrcLine + '</ul>');
					setTimeout(function() {
						$('#wenkmLrc')['addClass']('show')
					}, 0x1f4);
					lrcTime = setInterval(wenkmLrc['lrc']['play'], 0x1f4)
				},
				play: function() {
					var a = Math['round'](audio['currentTime']);
					if ($['inArray'](a, lrcTimeLine) > 0x0) {
						var b = $('.wenkmLrc' + a);
						if (!b['hasClass'](cur)) {
							b['addClass'](cur)['siblings']()['removeClass'](cur);
							$('#wenkmLrc')['animate']({
								scrollTop: lrcHeight * b['index']()
							})
						}
					} else {
						lrcCont = ''
					}
				},
				hide: function() {
					clearInterval(lrcTime);
					$('#wenkmLrc')['removeClass']('show')
				}
			},
			ksc: {
				format: function(b) {
					hasKsc = true;
					var c = [],
						kscEndTimeLine = [],
						kscCont = [],
						kscTimePer = [],
						kscMain = '',
						lineNow = 0x0,
						sex = 'b';
					b['replace'](/\'(\d*):(\d*).(\d*)\','(\d*):(\d*).(\d*)\','(.*)\',\s\'(.*)\'/g, function() {
						var a = arguments[0x1] | 0x0,
							startSec = arguments[0x2] | 0x0,
							startKsec = arguments[0x3] | 0x0,
							endMin = arguments[0x4] | 0x0,
							endSec = arguments[0x5] | 0x0,
							endKsec = arguments[0x6] | 0x0;
						c['push'](a * 0x258 + startSec * 0xa + Math['round'](startKsec / 0x64));
						kscEndTimeLine['push'](endMin * 0x258 + endSec * 0xa + Math['round'](endKsec / 0x64));
						kscCont['push'](arguments[0x7]);
						kscTimePer['push'](arguments[0x8])
					});
					for (var i = 0x0; i < c['length']; i++) {
						var d = '',
							kscTextPerTime = kscTimePer[i]['split'](',');
						if (kscCont[i]['indexOf']('(男:)') >= 0x0) {
							sex = 'm';
							kscCont[i] = kscCont[i]['replace']('(男:)', '')
						};
						if (kscCont[i]['indexOf']('(女:)') >= 0x0) {
							sex = 'g';
							kscCont[i] = kscCont[i]['replace']('(女:)', '')
						};
						if (kscCont[i]['indexOf']('(合:)') >= 0x0) {
							sex = 't';
							kscCont[i] = kscCont[i]['replace']('(合:)', '')
						};
						for (var j = 0x0; j < kscCont[i]['length']; j++) {
							if (kscCont[i][j] == '，') {
								d += '<span class="blank"><em dir="' + kscTextPerTime[j] + '"></em></span>'
							} else {
								d += '<span><em dir="' + kscTextPerTime[j] + '">' + kscCont[i][j] + '</em></span>'
							}
						};
						kscMain += '<div id="wenkmKsc' + kscEndTimeLine[i] + '" class="wenkmKsc' + c[i] + ' line line' + (i % 0x2 == 0x0 ? 0x1 : 0x2) + ' ' + sex + '"><div class="bg">' + d + '</div><div class="lighter">' + d + '</div></div>'
					};
					$('#wenkmKsc')['html'](kscMain);
					setTimeout(function() {
						$('#wenkmKsc')['addClass']('showPlayer')
					}, 0x1f4);
					kscTime = setInterval(wenkmLrc['ksc']['play'], 0x50)
				},
				play: function() {
					var a = Math['round'](audio['currentTime'] * 0xa);
					if ($('.wenkmKsc' + (a + 0xa))['length'] && !$('.wenkmKsc' + (a + 0xa))['hasClass'](cur)) {
						var b = $('.wenkmKsc' + (a + 0xa));
						b['addClass'](cur);
						b['hasClass']('line1') ? b['siblings']('.line1')['removeClass'](cur) : b['siblings']('.line2')['removeClass'](cur);
						setTimeout(function() {
							if (b['hasClass']('line1')) {
								wenkmLrc['ksc']['showLetters']['line1'](b);
								kscLineNow1 = true
							} else {
								wenkmLrc['ksc']['showLetters']['line2'](b);
								kscLineNow2 = true
							}
						}, 1e3)
					} else {
						kscCont = ''
					};
					if ($('#wenkmKsc' + (a - 0x1e))['length']) {
						$('#wenkmKsc' + (a - 0x1e))['removeClass'](cur)
					}
				},
				showLetters: {
					line1: function(a) {
						var b = $('.lighter span', a),
							$spanNow = b['eq'](tempNum1++),
							$em = $('em', $spanNow),
							spanT = +$em['attr']('dir');
						$em['animate']({
							width: '100%'
						}, spanT);
						if (tempNum1 < b['length']) {
							letterTime1 = setTimeout(function() {
								wenkmLrc['ksc']['showLetters']['line1'](a)
							}, spanT)
						} else {
							tempNum1 = 0x0;
							kscLineNow1 = false
						}
					},
					line2: function(a) {
						var b = $('.lighter span', a),
							$spanNow = b['eq'](tempNum2++),
							$em = $('em', $spanNow),
							spanT = +$em['attr']('dir');
						$em['animate']({
							width: '100%'
						}, spanT);
						if (tempNum2 < b['length']) {
							letterTime2 = setTimeout(function() {
								wenkmLrc['ksc']['showLetters']['line2'](a)
							}, spanT)
						} else {
							tempNum2 = 0x0;
							kscLineNow2 = false
						}
					}
				},
				hide: function() {
					clearInterval(kscTime);
					$('#wenkmKsc')['removeClass']('showPlayer')
				}
			}
		}
	}
};

function LimitStr(a, b, t) {
	b = b || 0x6;
	t = t || '...';
	var c = '';
	var d = a['length'];
	var h = 0x0;
	for (var i = 0x0; h < b * 0x2 && i < d; i++) {
		h += a['charCodeAt'](i) > 0x80 ? 0x2 : 0x1;
		c += a['charAt'](i)
	};
	if (i < d) c += t;
	return c
};

function netmusic() {
	$['ajax']({
		url: phpurl,
		dataType: 'jsonp',
		type: 'GET',
		data: {

			id: wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['replace']('wy', '')['replace']('xm', '')['replace']('qq', ''),


		},
		success: function(b) {
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				audio['src'] = b['location']['replace']('qq6354321', '126.net')
			} else {
				audio['src'] = b['location']['replace']('qq6354321', 'xiami.com')
			};
			$songFrom5['show']();
			$songFrom5['html']('<a class="down"><i class="fa fa-cloud-download" title="从' + songFrom55 + '下载：' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - ' + b['artist_name'] + '"></i></a>');
			$('.down')['click'](function() {
				window['open'](audio['src'], 'newwindow')
			});
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				lrcurl = wylrc
			} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('qq') >= 0x0) {
				lrcurl = qqlrc
			} else {
				lrcurl = b['lyric']['replace']('qq6354321', 'xiami.net')
			};
			$songName['html']('<span title="' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + '">' + LimitStr(wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '')) + '</span>');
			window['console']['log'](name + ' - 当前播放：' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - ' + b['artist_name']);
			$songFrom['html']('<span title="' + b['artist_name'] + '">' + LimitStr(b['artist_name']) + '</span>');
			$songFrom1['html']('<span title="' + b['album_name'] + '">' + LimitStr(b['album_name']) + '</span>');
			allmusic();
			var d = new Image();
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				d['src'] = b['album_cover']['replace']('qq6354321', '126.net')
			} else {
				d['src'] = b['album_cover']['replace']('qq6354321', 'xiami.net')
			};
			$cover['addClass']('changing');
			$(".blur").attr("src",d['src']);
			d['onload'] = function() {
				setTimeout(function() {
					$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
				}, 0x320);
				setTimeout(function() {
					$cover['removeClass']('changing')
				}, 0x64);
				$['ajax']({
					url: colorapi,
					type: 'GET',
					dataType: 'script',
					data: {
						url: d['src'],

					},
					success: function() {
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
						playercolor();
					},
					error: function() {
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
						var a = '0,0,0';
						playercolor();
					}
				})
			};
			d['error'] = function() {
				setTimeout(function() {
					$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
				}, 0x320);
				d['src'] = 'http://myhk.xlch520.cn/api/default.png';
				setTimeout(function() {
					wenkmTips['show'](wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - 专辑图片获取失败！')
				}, 4e3)
			};
			$cover['html'](d);
			audio['volume'] = volume;
			var c = window['document']['cookie']['indexOf']('myhk_player' + '=');
			if (c != -0x1) {
				wenkmMedia['pause']();
				$('#wenkmLrc,#wenkmKsc')['hide']();
				setTimeout(function() {
					$('.switch-ksclrc')['hide']();
					$('.switch-down')['css']('right', '35px');
					$('.switch-default')['css']('right', '65px')
				}, 0x1);
				setTimeout(function() {
					wenkmTips['show']('播放器自动停止播放')
				}, 3e3)
			} else {
				if (auto != 'close') {
					wenkmTips['show']('开始从' + songFrom55 + '播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
					audio['play']();
					$cover['addClass']('coverplay')
				} else {
					wenkmMedia['pause']();
					$('#wenkmLrc,#wenkmKsc')['hide']();
					setTimeout(function() {
						$('.switch-ksclrc')['hide']();
						$('.switch-down')['css']('right', '35px');
						$('.switch-default')['css']('right', '65px')
					}, 0x1);
					setTimeout(function() {
						wenkmTips['show']('播放器已关闭自动播放')
					}, 3e3)
				}
			};
			wenkmLrc['load']();
			RootCookies['SetCookie']('myhk_player_show', 'yes', 0x1)
		},
		error: function(a, b, c) {
			$songFrom5['hide']();
			setTimeout(function() {
				$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
			}, 0x320);
			setTimeout(function() {
				wenkmTips['show']('音乐播放器加载失败！')
			}, 4e3)
		}
	})
};

function allmusic() {
	musictooltip();
	$('li', $albumList)['eq'](albumId)['addClass'](cur)['find']('.artist')['html']('当前播放 > ')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']();
	if (!$('ul', $songList)['html']() == '' && $('[data-album=' + albumId + ']')['length']) {
		$('[data-album=' + albumId + ']')['find']('li')['eq'](songId)['addClass'](cur)['siblings']()['removeClass'](cur);
		$songList['mCustomScrollbar']('scrollTo', $('li.current', $songList)['position']()['top'] - 0x78)
	}
};

function playercolor() {
	$player['css']({
		background: 'rgba(' + cont + ',.8)'
	});
	$player1['css']({
		background: 'rgba(' + cont + ',.3)'
	});
	$tips['css']({
		background: 'rgba(' + cont + ',.6)'
	});
	$lk['css']({
		background: 'rgba(' + cont + ',.3)'
	})
};


function music(d, e) {
	$('#wenkmLrc,#wenkmKsc')['show']();
	albumId = d - 0x1;
	$player['removeClass']('showSongList');
	$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
	$['ajax']({
		url: fileurl,
		type: 'GET',
		dataType: 'script',
		success: function() {
			$('.switch-default')['hide']();
			hasdefault = false;
			wenkmPlayer['newplayList']['creat']['album']();
			wenkmMedia['getInfos'](e - 0x1);
			$('.play', $player)['click']()
		},
		error: function(a, b, c) {
			wenkmTips['show']('歌曲列表获取失败!');
			$('.switch-default')['show']()
		}
	})
};

function musictooltip() {
	$('#wenkmPlayer span,#wenkmPlayer div,#wenkmPlayer i')['each'](function() {
		$('#tooltip')['remove']();
		if (this['title']) {
			var a = this['title'];
			$(this)['mouseover'](function(b) {
				this['title'] = '';
				$('body')['append']('<div id="tooltip">' + a + '</div>');
				$('#tooltip')['css']({
					left: b['pageX'] - 0xf + 'px',
					top: b['pageY'] + 0x1e + 'px',
					opacity: '0.8'
				})['fadeIn'](0xfa)
			})['mouseout'](function() {
				this['title'] = a;
				$('#tooltip')['remove']()
			})['mousemove'](function(b) {
				$('#tooltip')['css']({
					left: b['pageX'] - 0xf + 'px',
					top: b['pageY'] + 0x1e + 'px'
				})
			})
		}
	})
};
$(window['document'])['ready'](function() {
	$(window)['keydown'](function(a) {
		var b = a['keyCode'];
		if (b == 0xc0) {
			auto = '';
			if (audio['paused']) {
				$('.play', $player)['click']()
			} else {
				$('.pause', $player)['click']()
			}
		}
	})
});
$(window)['scroll'](function() {
	var a = $(this)['scrollTop']();
	var b = $(window['document'])['height']();
	var c = $(this)['height']();
	if (a + c == b) {
		if (hasgeci) {
			if (ycgeci) {
				$player['addClass']('ksclrc');
				$('#wenkmLrc')['addClass']('hide');
				$('#wenkmKsc')['addClass']('hidePlayer');
				$songFrom3['html']('<i class="fa fa-times-circle"></i> 歌词暂时隐藏');
				$songFrom4['html']('<i class="fa fa-toggle-off" title="歌词暂时隐藏"></i>');
				if (hasLrc) {
					wenkmTips['show']('Lrc歌词自动隐藏')
				};
				if (hasKsc) {
					wenkmTips['show']('Ksc歌词自动隐藏')
				}
			}
		}
	} else {
		if (hasgeci) {
			if (ycgeci) {
				$player['removeClass']('ksclrc');
				$('#wenkmLrc')['removeClass']('hide');
				$('#wenkmKsc')['removeClass']('hidePlayer');
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词开启')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Ksc歌词开启')
				};
				$songFrom4['html']('<i class="fa fa-toggle-on" title="关闭歌词"></i>')
			}
		}
	};
	musictooltip()
});
