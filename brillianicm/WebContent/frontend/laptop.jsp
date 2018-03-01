<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<div class="laptopContainer">
	<div class="laptopMailClient easyui-tabs" data-options="border:false,fit:true,tools:'#tabs-tool'">
		<div title="<%=ApplicationConstants.MAIL_CLIENT_TAB1%>">
		<div id="tabs-tool" style="border-top-width:0px;border-right-width: 0px;height: inherit !important;">
		    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" onclick="addPanel()"></a>
		</div>
			<table class="laptopMailClientInbox easyui-datagrid" data-options="border:false,fitColumns:true,singleSelect:true,fit:true">
				<thead>
					<tr>
						<th data-options="field:'id',resizable:false,hidden:true">Attachment</th>
						<th data-options="field:'from',width:100,resizable:false">From</th>
						<th data-options="field:'to',resizable:false,hidden:true">To</th>
						<th data-options="field:'subject',width:100,resizable:false">Subject</th>
						<th data-options="field:'date',width:100,resizable:false,align:'right'">Date</th>
						<th data-options="field:'content',resizable:false,hidden:true">Content</th>
						<th data-options="field:'attachment',resizable:false,align:'right',hidden:true">Attachment</th>
						<th data-options="field:'attachmentHref',resizable:false,align:'right',hidden:true">AttachmentHref</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>Loading data...</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>