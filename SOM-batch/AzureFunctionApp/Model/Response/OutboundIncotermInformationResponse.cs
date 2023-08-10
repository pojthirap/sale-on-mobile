﻿using AzureFunctionApp.Model.Response.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionApp.Model.Response.OutboundIncotermInformationResponse
{
    public class OutboundIncotermInformationResponse : ResponseBase<Data>
    {
        public List<Data> Data { get; set; }
    }


    public class Data
    {
        public long Update_Date { get; set; }
        public string Update_Time { get; set; }
        public string Status_IND { get; set; }
        public string Incoterms { get; set; }
        public string Description { get; set; }
    }
}
