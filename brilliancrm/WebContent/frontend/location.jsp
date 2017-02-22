<%@ page import="org.dhbw.imbit11.ApplicationConstants" %>
<div class="locationBackgroundContainer easyui-panel" data-options="fit:true,border:false">
	<div class="dialogContainer">
		<video id="background-video">
			<source src="" type="video/mp4">
		</video>
		<div class="dialogTextContainer bc easyui-panel" data-options="width:315,height:562,border:false">
			<div class="dialogPartner panel-header">
				<div class="dialogPartnerName panel-title"></div>
				<div class="dialogPartnerText"></div>
			</div>
		</div>
		<div class="dialogMoodContainer">
			<img class="dialogMood" />
		</div>
	</div>
	<div class="selectionContainer easyui-panel" data-options="fit:true,border:false">
		<div class="selectionTitle">
			<div class="selectionTitleName"></div>
			<div class="selectionTitleText"></div>
		</div>
		<div class="selectionOptionContainer bc">
			<a class="fancybox"><img class="selectionPicture bc"></a>
			<div class="selectionText"></div>
			<div class="selectionButton easyui-linkbutton"><%=ApplicationConstants.SELECTION_BUTTON%></div>
		</div>
		<div class="selectionOptionContainer bc">
			<a class="fancybox"><img class="selectionPicture bc"></a>
			<div class="selectionText"></div>
			<div class="selectionButton easyui-linkbutton"><%=ApplicationConstants.SELECTION_BUTTON%></div>
		</div>
		<div class="selectionOptionContainer bc">
			<a class="fancybox"><img class="selectionPicture bc"></a>
			<div class="selectionText"></div>
			<div class="selectionButton easyui-linkbutton"><%=ApplicationConstants.SELECTION_BUTTON%></div>
		</div>
	</div>
	<div class="allocationContainer easyui-panel" data-options="fit:true,border:false">
		<div class="description"></div>
	    <div class="phaseTitleContainer">
		    <div class="phaseTitle bc panel-header panel-title"></div>
		    <div class="phaseTitle bc panel-header panel-title"></div>
		    <div class="phaseTitle bc panel-header panel-title"></div>
		    <div class="phaseTitle bc panel-header panel-title"></div>
	    </div>
	    <div style="clear: both;"></div>
	    <div class="phaseContainer">
		    <div class="phase bc"></div>
		    <div class="phase bc"></div>
		    <div class="phase bc"></div>
		    <div class="phase bc"></div>
	    </div>
	    <div style="clear: both;"></div>
	    <div class="draggableContainer bc"></div>
	    <div style="clear: both;"></div>
	    <div class="dragInfoContainer">
	    </div>
	    <div style="clear: both;"></div>
	    <div class="buttonContainer">
	    	<div id="continueButton" class="easyui-linkbutton allocationButton"><%=ApplicationConstants.ALLOCATION_BUTTON%></div>
	    </div>
	</div>


<div class="matrixAllocationContainer easyui-panel" data-options="fit:true,border:false">
		<div class="description"></div>
	    <div style="clear: both;"></div>
	    <div id="yAxisDescription"></div>
	    <div class="tileAcceptorContainer">
	    	<div class="bc tileAcceptor"></div>
	    	<div class="bc tileAcceptor"></div>
	    	<div class="bc tileAcceptor"></div>
	    	<div style="clear: both;"></div>
		    <div class="bc tileAcceptor"></div>
		    <div class="bc tileAcceptor"></div>
		    <div class="bc tileAcceptor"></div>
		     <div style="clear: both;"></div>
		    <div class="bc tileAcceptor"></div>
		    <div class="bc tileAcceptor"></div>
		    <div class="bc tileAcceptor"></div>
	    </div>
	    <div style="clear: both;"></div>
	    <div id="xAxisDescription"></div>
	    <div class="draggableTilesContainer bc"></div>
	    <div style="clear: both;"></div>
	    
	    <div class="buttonContainer">
	    	<div id="continueButtonMatrix" class="easyui-linkbutton allocationButton"><%=ApplicationConstants.ALLOCATION_BUTTON%></div>
	    </div>
	</div>
</div>

