using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace BlazorDraw.Services
{
    public class ImageService
{
    public static async Task<string> DrawLineAndSave(string path)
    {
        // Drawing logic (use System.Drawing or another library)
        using (var bitmap = new Bitmap(800, 600))
        {
            using (var graphics = Graphics.FromImage(bitmap))
            {
                graphics.Clear(Color.White); // Background color
                using (var pen = new Pen(Color.Blue, 5))
                {
                    // Draw your line here
                    graphics.DrawLine(pen, 100, 100, 700, 500);
                }
            }
            bitmap.Save(path, ImageFormat.Png);
        }

        // Return the relative path to the saved image
        return "/images/line.png"; // Make sure this path matches the saved location
    }
}
}