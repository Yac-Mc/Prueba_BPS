using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace BPS_Api.Handlers
{
    public class GlobalErrorLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            var exception = context.Exception;
            string traceDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            string processName = new StackTrace(exception).GetFrame(1).GetMethod().Name;
            string message = "\r\n\r\nERROR INTERNO DE APLICACIÓN: " + exception.Message + "\r\n\t\t\t" +
                             "Proceso: " + processName + "\r\n\t\t\t" +
                             "StackTrace" + exception.ToString();

            string pathLog = "C://Bizagi//DLL//YOE//Log_API_BPS";
            string fileLogName = "Log_API_BPS.txt";

            Directory.CreateDirectory(pathLog);
            FileStream objFilestream = new FileStream(string.Format("{0}\\{1}", pathLog, fileLogName), FileMode.Append, FileAccess.Write);
            StreamWriter objStreamWriter = new StreamWriter((Stream)objFilestream);
            objStreamWriter.WriteLine(traceDate + message);
            objStreamWriter.Close();
            objFilestream.Close();
        }
    }
}