﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFirstAzureWebApp.Models.record
{
    public class RecordSaFormFileModel : ModelBase
    {

        public string FileId { get; set; }
        public string AttachCateId { get; set; }
        //public string RecSaFormId { get; set; }
        public string FileName { get; set; }
        public string FileExt { get; set; }
        public string FileSize { get; set; }
        public string PhotoFlag { get; set; }



    }
}
