﻿using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyFirstAzureWebApp.SearchCriteria;
using MyFirstAzureWebApp.Models;
using MyFirstAzureWebApp.Models.ms;
using MyFirstAzureWebApp.ModelCriteria;
using MyFirstAzureWebApp.Models.adm;

namespace MyFirstAzureWebApp.Business.org
{
    public interface IAdmLogLogin
    {
        Task<AdmLogLogin> Add(AdmLogLoginModel admLogLoginModel);
    }
}
