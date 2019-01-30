define( [ "qlik" , "css!./css/style.css"
],
function ( qlik) {

	return {
		definition: {
			type: "items",
			component: "accordion",
			items: {
				appearanceSection : {
					uses: "settings",
					items: {
						myEffect: {
							ref: "props.myEffect",
							component: "radiobuttons",
							label: "Effect",
							type: "string",
							defaultValue: "1",
							options: [{
								value: "1",
								label: "Effect 1"
							}, {
								value: "2",
								label: "Effect 2"
							}, {
								value: "3",
								label: "Effect 3"
							}, {
								value: "4",
								label: "Effect 4"
							}, {
								value: "5",
								label: "Effect 5"
							}
							]
						}
					}
				}
			}
		},
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element, layout) {
			//add your rendering code here

			var app = qlik.currApp(this);
			var effect = layout.props.myEffect;
			html = '<div class="slider-containers"><div class="slider-container"><div class="flexbox-slider flexbox-slider-' + effect + '">';
			app.getList("sheet", function(reply){
				reply.qAppObjectList.qItems.sort((obj1, obj2) => obj1.qData.rank-obj2.qData.rank).forEach(function(sheet){
					if(sheet['qInfo']['qId'] != qlik.navigation.getCurrentSheetId().sheetId)
						html += '<div class="flexbox-slide" id=' + sheet['qInfo']['qId'] + '> <img src=" ' + sheet.qData.thumbnail.qStaticContentUrl.qUrl +' " alt="Slide Image">             <div class="text-block">               <h3> ' + sheet['qMeta']['title'] + '</h3>               <div class="text">                 <p> ' + sheet['qMeta']['description'] + ' </p>               </div>             </div>           </div>           ';
			})
		}).then(function(){
					html += '</div></div></div>';
					$element.html( html );
					console.log('listo');
					})
			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );
