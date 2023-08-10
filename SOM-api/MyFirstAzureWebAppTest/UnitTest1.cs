using MyFirstAzureWebApp;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using MyFirstAzureWebApp.Controllers;
using MyFirstAzureWebApp.common;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using SendGrid.Helpers.Mail;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Castle.Components.DictionaryAdapter.Xml;

namespace MyFirstAzureWebAppTest
{
    [TestClass]
    public class UnitTest1 : BaseController
    {
              
        [TestMethod]
        public void Get_Should_Return_Bars()
        {
            var controller = new BarController();

            // Act
            var result = controller.version() as ContentResult;
            var expected = "<html>" +
                        "<head>" +
                        "<meta  charset='UTF - 8' name='viewport' content='width=device-width, initial-scale=1'>" +
                        "<style>" +
                        ".card {" +
                        "  border-style: solid; border-width:thin; border-color: #9e9e9e;" +
                        "  transition: 0.3s;" +
                        "  width: 40%;" +
                        "}" +
                        ".card:hover {" +
                        "  border-style: solid; border-width:2px; border-color: #00bcd4;" +
                        "}" +
                        ".container {" +
                        "  padding: 2px 16px;" +
                        "}" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<h2>API Current Version:" + CommonConstant.VERSION + "</h2>" +

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>17/01/2022 v1.0.2 </b></h4> " +
                        "    <p>1. Template Stock Card: �ӡ������¹�ŧ�Է���㹡����Ҷ֧�дѺ BU</p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>02/02/2022  v1.0.3 </b></h4> " +
                        "    <p>1. ��䢡�� Mapping �Ӻ� ������ö����͵Ӻū�������褹����������</p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>23/02/2022  v2.0.0 </b></h4> " +
                        "    <p>1. Penetration Test </p> " +
                        "    <p>2. Sale Visit, Adhoc Template ��Ҩе�ͧ�ջ��� delete ���ź template ��� adhoc ���� (����䢵͹���������� �С���������� ������disable) </p> " +
                        "    <p>3. Sale Order, Company �ʴ���������ҡ �Ҩ���բ��������â�ҧ��ѧ���� ����ѹ�Ҩ���ʴ�����ᵡ��ҧ�� :</p> " +
                        "    <p>4. Sale Visit Plan, Template for SA �����仡�˹�ʶҹ���� �����ҹ ���� ��è�����ʴ����˹�� Create Plan �ͧ Special Task</p> " +
                        "    <p>5. ����ͧ�� query ���Թ resources ����� 4 api searchMyAccount, searchProspectRecommend,searchAccountInTerritory,searchOtherProspect </p> " +
                        "    <p>6. CR: ��˹�Ҩ�����������͡����� QR Code �������ͧ Customer ������͡��ٻẺ�ͧ A4 (����� QR ����� A4 ����ӹǹ����˹� �������� Print) </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>16/03/2022  v2.0.1 </b></h4> " +
                        "    <p>1. Edit Service /addProspectDedicated �Ѻ TerritoryId �� Multi(Array) </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>01/04/2022  v2.0.2 </b></h4> " +
                        "    <p>1. ���� Sale Group �Ѻ Territory 㹵��ҧ�ʴ��Ţͧ Employee ���� : Now </p> " +
                        "    <p>2. Service:/updSaleOrder ��䢡�äӹǹ NetPrice1 �� Condition_Total_Value - (Sum(Condition_Amount)/Sum(Condition_Per))  �ͧ ZL34 </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>04/04/2022  v2.0.3 </b></h4> " +
                        "    <p>1. Fix bug Service:/updSaleOrder ��䢡�äӹǹ NetPrice1 �� Condition_Total_Value - (Sum(Condition_Amount)/Sum(Condition_Per))  �ͧ ZL34 </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>16/11/2022  v2.0.4 </b></h4> " +
                        "    <p>1. Redesign </p> " +
                        "    <p>2. �Ѵ Table ORG_SALE_TERRITORY </p> " +
                        "    <p>3. ��� Bug ��ҧ� </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>27/12/2022  v2.0.5 </b></h4> " +
                        "    <p>1. Update Service org/updrSaleGroupByManagerEmpId �������͹� G.GROUP_CODE in 00005 ���� </p> " +
                        "    <p>2. Update Service adm/searchAdmEmpRoleManager �Ѵ���͹� SG.ACTIVE_FLAG=Y �ί</p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>27/12/2022  v2.0.7 </b></h4> " +
                        "    <p>1. Update Report </p> " +
                        "    <p>2. Update Service searchShipToByCustSaleId Field CUST_NAME_TH </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card

                        // Card
                        "<div class='card'> " +
                        "  <div class='container'>" +
                        "    <h4><b>16/03/2022  v2.0.8 </b></h4> " +
                        "    <p>1. Update Report </p> " +
                        "  </div>" +
                        "</div>" +
                        // Card




                        "</div>" +
                        "</body>" +
                        "</html> ";
            // Assert
            NUnit.Framework.Assert.NotNull(result);
            NUnit.Framework.Assert.AreEqual(expected, result.Content);
        }

        
    }
}