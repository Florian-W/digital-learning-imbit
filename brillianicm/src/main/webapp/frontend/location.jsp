<div class="locationBackgroundContainer easyui-panel"
	data-options="fit:true,border:false">

	<!-- eventtyp 3: Selection-->
	<div class="dialogContainer easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="dialogTextContainer easyui-panel"
				data-options="width: 315, border:false" style="height: inherit">
				<div class="dialogPartner panel-header">
					<div class="dialogPartnerName panel-title"></div>
					<div class="dialogPartnerText"></div>

				</div>
			</div>
			<video id="background-video" controls>
				<source src="" type="video/mp4">
			</video>
			<div class="dialogMoodContainer">

				<img class="dialogMood" />
			</div>
		</div>
	</div>

	<!-- eventtyp 2: Start Page -->
	<div class="pictureContainer"
		style="background-color: #d5edf3; width: 100%; height: 100%;"
		data-options="fit:true,border:false">
		<div class="bgimg"
			style="width: 60% !important; float: right !important;"></div>
		<h4
			style="text-transform:none; text-align: center; <!--  position: relative;
top: 50%;-->">Please
			select the country from the drop-down list above</h4>
	</div>

	<!-- eventtyp 14 & 15: choose ohne Bild und eventtype 5: choose mit Bild -->
	<div class="selectionContainer easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="centerContainer">
			<div class="selectionTitle">
				<div class="selectionTitleName"></div>
				<div class="selectionTitleText"></div>
			</div>
			<div class="selectionOptionContainer bc">
				<a class="fancybox"><img class="selectionPicture bc"></a>
				<div class="selectionText"></div>
				<div class="selectionButton easyui-linkbutton">Choose!</div>
			</div>
			<div class="selectionOptionContainer bc">
				<a class="fancybox"><img class="selectionPicture bc"></a>
				<div class="selectionText"></div>
				<div class="selectionButton easyui-linkbutton">Choose!</div>
			</div>

			<div class="selectionOptionContainer bc">
				<a class="fancybox"><img class="selectionPicture bc"></a>
				<div class="selectionText"></div>
				<div class="selectionButton easyui-linkbutton">Choose!</div>
			</div>
		</div>

	</div>

	<!-- eventtyp 16 & 17: vier Spalten mit drag und drop -->
	<div class="allocationContainer easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer margin-left">
			<div class="description"></div>
			<div class="phaseTitleContainer">
				<div class="phaseTitle bc panel-header panel-title"></div>
				<div class="phaseTitle bc panel-header panel-title"></div>
				<div class="phaseTitle bc panel-header panel-title"></div>
				<div class="phaseTitle bc panel-header panel-title"></div>
			</div>
			<div class="phaseContainer">
				<div class="phase bc"></div>
				<div class="phase bc"></div>
				<div class="phase bc"></div>
				<div class="phase bc"></div>
			</div>
			<div class="draggableContainer bc"></div>
			<div class="dragInfoContainer"></div>
			<div class="buttonContainer">
				<div id="continueButton" class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>



	<!-- eventtyp 18: zwei Spalten mit drag und drop -->
	<div class="allocationContainerTwo easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer margin-left">
			<div class="description"></div>
			<div class="container">
				<div class="phaseTitleContainerTwo">
					<div class="phaseTitleTwo bc panel-header panel-title"></div>
					<div class="phaseTitleTwo bc panel-header panel-title"></div>
				</div>
				<div class="phaseContainerTwo">
					<div class="phaseTwo bc"></div>
					<div class="phaseTwo bc"></div>
				</div>
			</div>
			<div class="draggableContainerTwo bc"></div>
			<div class="dragInfoContainerTwo"></div>
			<div class="buttonContainer">
				<div id="continueButtonTwo"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>

	<!-- eventtyp 19: zwei Zeilen mit drag und drop (iceberg) -->
	<div class="allocationContainerThree easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer margin-left">
			<div class="description"></div>
			<div class="phaseContainerThree">
				<div class="phaseThree bc"></div>
				<div class="phaseThree bc"></div>
			</div>
			<div class="draggableContainerThree bc"></div>
			<div style="clear: both;"></div>
			<div class="dragInfoContainerThree"></div>
			<div style="clear: both;"></div>
			<div class="buttonContainer">
				<div id="continueButtonThree"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>


	<!-- eventtyp 21: 4 Ohren Modell -->
	<div class="matrixAllocationContainer easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description">conversation</div>
			<div class="tileAcceptorContainer">
				<div class="bc BorderHorizontalVertical"></div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontal">Self Revelation Side</div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontalVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc BorderVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical">
					<div class="outerrightMessage">Relationship</div>
				</div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent">
					<div class="Message">Message</div>
				</div>
				<div class="bc tileAcceptor"></div>
				<div class="bc BorderVertical">
					<div class="outerleftMessage">Appeal</div>
				</div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc BorderVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderHorizontalVertical"></div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontal">Factual Information</div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontalVertical"></div>

				<div style="clear: both;"></div>
				<div class="draggableTilesContainer bc"></div>
				<div class="buttonContainer">
					<div id="continueButtonMatrix"
						class="easyui-linkbutton allocationButton">Done</div>
				</div>
			</div>
		</div>

	</div>

	<!--eventtyp: 23 Conversation-->
	<div class="conversation easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description"></div>
			<div class="bc dialogBox"></div>
			<div class="buttonContainer"></div>
		</div>
	</div>

	<!--eventtyp: 24 textBox-->
	<div class="textBox easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description"></div>
			<div class="messageBox"></div>
			<div class="buttonContainer button-bottom">
				<div id="continueButtonTextBox"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>

	</div>

	<!-- eventtyp 20: 9x9 Matrix-->
	<div class="matrixAllocationContainerStandard easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description"></div>
			<div style="clear: both;"></div>
			<!--<div class="yAxisDescription"></div> -->
			<div class="tileAcceptorContainerStandard">
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div style="noshade: size='1';"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>
				<div class="bc tileAcceptorStandard"></div>


				<!--	<div class="xAxisDescription"></div> -->
			</div>
			<div class="draggableTilesContainerStandard bc"></div>

			<div class="buttonContainer">
				<div id="continueButtonMatrixStandard"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>


	<!--  eventtype 25 Worldmap -->
	<div class="worldmap easyui-panel panel-body"
		data-options="fit:true,border:false" style="overflow-y: auto;">
		<div style="height: 900px; position: absolute;"></div>
		<div class="centerContainer" style="position: relative;">
			<div class="description"></div>
			<div id="worldMap" class="worldmapImg" style="height: 853px;">
				<div id="b11" class="block" style="float: left;"
					onclick="wrongSelection()"></div>
				<div id="b12" class="block"
					style="float: left; border-right: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b21" class="block"
					style="float: left; border-left: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b22" class="block" style="float: left;"
					onclick="wrongSelection()"></div>
				<div id="b13" class="block"
					style="float: left; border-bottom: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b14" class="block"
					style="float: left; border-right: 2px solid black; border-bottom: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b23" class="block"
					style="float: left; border-left: 2px solid black; border-bottom: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b24" class="block"
					style="float: left; border-bottom: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b31" class="block"
					style="float: left; border-top: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b32" class="block"
					style="float: left; border-top: 2px solid black; border-right: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b41" class="block"
					style="float: left; border-top: 2px solid black; border-left: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b42" class="block"
					style="float: left; border-top: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b33" class="block" style="float: left;"
					onclick="wrongSelection()"></div>
				<div id="b34" class="block"
					style="float: left; border-right: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b43" class="block"
					style="float: left; border-left: 2px solid black;"
					onclick="wrongSelection()"></div>
				<div id="b44" class="block" style="float: left;"
					onclick="wrongSelection()"></div>
			</div>
		</div>
	</div>


	<!--eventtyp: 26 ScrollBar-->
	<div class="scrollBar easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description"></div>
			<div class="description26"></div>

			<div class="scrollBarContent">
				<div class="description2">1 (weak) &nbsp;&nbsp; &nbsp;
					to&nbsp; &nbsp;&nbsp; 7 (strong)</div>
				<div class="description3">Solution</div>
				<div class="inputRowPD">
					<input class="text" type="textbox" value="Power Distance:" readonly />
					<input class="input" type="textbox" id="powerDistance" value="1"
						readonly /> <input class="value" type="range"
						id="powerDistanceUserValue" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('powerDistance').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowInsC">
					<input class="text" type="textbox"
						value="Institutional Collectivism:" readonly /> <input
						class="input" type="textbox" id="institutionalCollectivism"
						value="1" readonly /> <input class="value" type="range" min="1"
						max="7" value="1" step=".5"
						onchange="document.getElementById('institutionalCollectivism').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowGE">
					<input class="text" type="textbox" value="Gender Egalitarism:"
						readonly /> <input class="input" type="textbox"
						id="genderEgalitarism" value="1" readonly /> <input class="value"
						type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('genderEgalitarism').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowIngC">
					<input class="text" type="textbox" value="Ingroup Collectivism:"
						readonly /> <input class="input" type="textbox"
						id="ingroupCollectivism" value="1" readonly /> <input
						class="value" type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('ingroupCollectivism').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowPO">
					<input class="text" type="textbox" value="Performance Orientation:"
						readonly /> <input class="input" type="textbox"
						id="performanceOrientation" value="1" readonly /> <input
						class="value" type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('performanceOrientation').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowFO">
					<input class="text" type="textbox" value="Future Orientation:"
						readonly /> <input class="input" type="textbox"
						id="futureOrientation" value="1" readonly /> <input class="value"
						type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('futureOrientation').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowUA">
					<input class="text" type="textbox" value="Uncertainty Avoidance:"
						readonly /> <input class="input" type="textbox"
						id="uncertaintyAvoidance" value="1" readonly /> <input
						class="value" type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('uncertaintyAvoidance').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowA">
					<input class="text" type="textbox" value="Assertiveness:" readonly />
					<input class="input" type="textbox" id="assertiveness" value="1"
						readonly /> <input class="value" type="range" min="1" max="7"
						value="1" step=".5"
						onchange="document.getElementById('assertiveness').value = this.value"
						style="width: 250px;" />
				</div>

				<div class="inputRowHO">
					<input class="text" type="textbox" id="text"
						value="Humane Orientation:" readonly /> <input class="input"
						type="textbox" id="humaneOrientation" value="1" readonly /> <input
						class="value" type="range" min="1" max="7" value="1" step=".5"
						onchange="document.getElementById('humaneOrientation').value = this.value"
						style="width: 250px;" />
				</div>
			</div>

			<div class="buttonContainer button-bottom2">
				<div id="continueButtonScrollButton"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>






	<!-- eventtyp 27: 4 Ohren Modell alternativ -->
	<div class="matrixAllocationContainerAlternate easyui-panel panel-body"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer">
			<div class="description">conversation</div>
			<div class="eventContainer">
				<div class="bc BorderHorizontalVertical"></div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontal">Self Revelation Side</div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontalVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc BorderVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical">
					<div class="outerrightMessage">Relationship</div>
				</div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent">
					<div class="Message">Message</div>
				</div>
				<div class="bc tileAcceptor"></div>
				<div class="bc BorderVertical">
					<div class="outerleftMessage">Appeal</div>
				</div>

				<div style="clear: both;"></div>

				<div class="bc BorderVertical"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc tileAcceptor"></div>
				<div class="bc tileAcceptorTransparent"></div>
				<div class="bc BorderVertical"></div>

				<div style="clear: both;"></div>

				<div class="bc BorderHorizontalVertical"></div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontal">Factual Information</div>
				<div class="bc BorderHorizontal"></div>
				<div class="bc BorderHorizontalVertical"></div>

				<div style="clear: both;"></div>
				<div class="draggableTilesContainerAlternate bc"></div>
			</div>
			<div class="infoContainer">
				<table class="eventInfoTable bc">
					<tr>
						<td class="elementNumber-header border_bottom">Element</td>
						<td class="elementInfo-header border_bottom">Description
					<tr>
						<td class="elementNumber border_bottom">1</td>
						<td id="rank1" class="elementInfo border_bottom"></td>
					</tr>
					<tr>
						<td class="elementNumber border_bottom">2</td>
						<td id="rank2" class="elementInfo border_bottom"></td>
					</tr>
					<tr>
						<td class="elementNumber border_bottom">3</td>
						<td id="rank3" class="elementInfo border_bottom"></td>
					</tr>
					<tr>
						<td class="elementNumber">4</td>
						<td id="rank4" class="elementInfo "></td>
					</tr>
				</table>
			</div>
			<div class="buttonContainer">
				<div id="continueButtonMatrixAlternate"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>
	</div>

	<!-- eventtype 28: Factsheet-->
	<!-- EDIT BY ANIL ON MAR 04, 2016 -->
	<!-- Adding an invisible audiocontrol for the national anthem -->
	<audio controls id="audioHymne" style="display:none;">
		Your browser does not support the audio tag.
	</audio>
	<!-- End of line -->
	
	<div class="factsheetContainer easyui-panel"
		style="background-color: #D5ECF2;"
		data-options="fit:true,border:false">

		<div style="float: right">
			<p>
				<img id="sideimg1" src="" class="img-factsheet2" alt="Jesus">
			</p>
			<p>
				<img id="sideimg2" src="" class="img-factsheet2" alt="Pele">
			</p>
			<p>
				<img id="sideimg3" src="" class="img-factsheet2" alt="Frau mit Tütü">
			</p>
		</div>
		
		<!-- EDIT BY MARVIN ON MAR 6, 2016 -->
		<!-- Place this div into an anchor -->
		<!-- <div id="titletext" class="title-factsheet"></div> -->
		<!-- End of line  -->

		<!-- EDIT BY MARVIN ON MAR 6, 2016 -->
		<!-- Wrap anchor around div (id:titletext) for map link on country name -->
		<a id = "showMap">
			<div id="titletext" class="title-factsheet"></div>
		</a>
		<!-- End of line -->
		
		<img id="flag" src="" class="img-factsheet1" alt="BR_flag">

		<div>
			<table>
				<tr>
					<td class="txt-factsheet1">Capital</td>
					<td id="capitaltext" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Official Languages</td>
					<td id="langtext" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Currency</td>
					<td id="currency" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Government</td>
					<td id="government" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Area</td>
					<td><div id="area" class="txt-factsheet2"
							style="float: left; padding-right: 10px"></div>
						<div class="txt-factsheet2">
							km<sup>2</sup>
						</div></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Population</td>
					<td id="population" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Ethnic Groups</td>
					<td id="ethgroups" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">National Holiday</td>
					<td id="natholiday" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">National Sport</td>
					<td id="natsport" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">You should have heard of...</td>
					<td id="uheardof" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">Did you know...</td>
					<td id="diduknow" class="txt-factsheet2"></td>
				</tr>
				<tr>
					<td class="txt-factsheet1">More information on...</td>
					<td><a href="" id="moreinfo" class="link-factsheet"
						target="_blank"></a></td>
				</tr>
			</table>
		</div>

		<div class="buttonContainer">
			<div id="continueButtonFactsheet"
				class="easyui-linkbutton allocationButton">Done</div>
		</div>


	</div>

	<!--  Christian Heyer
02.03.2016 -->
	<!-- eventtype 29: mapAllocation-->
	<div class="mapAllocationContainer easyui-panel"
		style="background-color: #D5ECF2;"
		data-options="fit:true,border:false">

		<div class="container">
			<div class="row">
				<h1 id="mapAllocationTitle" style="text-transform: none"></h1>
			</div>
			<div class="row">
				<div class="col-md-6">

					<div id="mapContainer"
						style="background-image: url('images/DE_SoccerMap.jpg')"></div>
				</div>
				<div class="col-md-6">
					<div id="itemDescription"></div>
					<div id="src" class="target"></div>
				</div>
			</div>
			<div class="row">
				<div class="buttonContainer">
					<div id="continueButtonMapAllocation"
						class="easyui-linkbutton allocationButton">Done</div>
				</div>
			</div>
		</div>

	</div>


	<!-- END -->
	<!--  Anastasia Reimer 03.03.2016 -->
	<!-- eventtype 30: AllocationFour-->
	<div class="allocationContainerFour easyui-panel"
		style="background-color: #D5ECF2;"
		data-options="fit:true,border:false">
		<div class="bgimg"></div>
		<div class="centerContainer margin-left">
			<div class="description"></div>
			<div class="container">
				<div class="phaseTitleContainerFour">
					<div class="phaseTitleFour bc panel-header panel-title"></div>
					<div class="phaseTitleFour bc panel-header panel-title"></div>
					<div class="phaseTitleFour bc panel-header panel-title"></div>
				</div>
				<div class="phaseContainerFour">
					<div class="phaseFour bc"></div>
					<div class="phaseFour bc"></div>
					<div class="phaseFour bc"></div>
				</div>
			</div>
			<div class="draggableContainerFour bc"></div>
			<div class="dragInfoContainerTwo"></div>
			<div class="buttonContainer">
				<div id="continueButtonAllocationFour"
					class="easyui-linkbutton allocationButton">Done</div>
			</div>
		</div>

	</div>
	<!-- END -->
</div>