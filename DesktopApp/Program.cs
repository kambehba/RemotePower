using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Timers;
using System.Threading;
using System.IO.Ports;

namespace RemotePower
{
    class Program
    {
        private static string _output1 { get; set; }
        private static string _output2 { get; set; }
        private static string _output3 { get; set; }
        private static List<string> _outputs { get; set; }
        static SerialPort _serialPort;
        private static System.Timers.Timer ReadOutputValuesTimer;
      
        
 
        static void Main(string[] args)
        {
            ReadOutputValuesTimer = new System.Timers.Timer();
            ReadOutputValuesTimer.Enabled = true;
            ReadOutputValuesTimer.Interval = 4000;
            ReadOutputValuesTimer.Elapsed += new ElapsedEventHandler(ReadOutputValuesTimerElapsed);

            _outputs = new List<string>();
            _output1 = "https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs/1.json";
            _output2 = "https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs/2.json";
            _output3 = "https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs/3.json";
            _outputs.Add(_output1); _outputs.Add(_output2); _outputs.Add(_output3);

            _serialPort = new SerialPort();
            _serialPort.BaudRate = 9600;
            _serialPort.PortName = "COM4";
            _serialPort.Open();
          


            Console.WriteLine("Welcome to Remote Power.");
            Console.WriteLine("To Start Press s.");
            string userCommand = Console.ReadKey().Key.ToString();
            while(String.Compare(userCommand,"e",true) != 0)
            {
                if (String.Compare(userCommand, "s", true) == 0)
                {
                    Console.WriteLine("Remote Power Started...");
                }

                Console.WriteLine("To Exit Press e.");
                userCommand = Console.ReadKey().Key.ToString();
                
            }
            

            //Task t = new Task(DownloadPageAsync);
            //t.Start();
            //Console.WriteLine("Downloading page...");
            //Console.ReadLine();
            
        }


        static async void DownloadPageAsync()
        {
            foreach(var item in _outputs)
           {
               using (HttpClient client = new HttpClient())
               using (HttpResponseMessage response = await client.GetAsync(item))
               using (HttpContent content = response.Content)
               {
                   // ... Read the string.
                   string result = await content.ReadAsStringAsync();

                   // ... Display the result.
                   if (result != null)
                   {
                       Console.WriteLine(item);
                       Console.WriteLine(result);
                       //write to result on serial port
                       _serialPort.Write(_output1);
                   }
               }
               Thread.Sleep(2000);
           }
        }

        private static void ReadOutputValuesTimerElapsed(object sender, ElapsedEventArgs e)
        {
            Task t = new Task(DownloadPageAsync);
            t.Start();
            Console.WriteLine("Downloading page...");
            Console.ReadLine();
        }





    }
}
