package Servlet;

import BLL.storeBLL;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

@WebServlet(name = "UploadFile", value = "/UploadFile")
@MultipartConfig
public class UploadFile extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private String filePath;
    private String localPath;
    private int maxFileSize = 1024 * 1024;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");
        String store = request.getParameter("store");
        filePath = this.getServletContext().getRealPath("/") + File.separator
                + "upload" + File.separator + "store" + File.separator + store;
        localPath = "upload" + File.separator + "store" + File.separator + store;
        File file = new File(filePath);
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost");
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setSizeMax(maxFileSize);

        try {
            List fileItems = upload.parseRequest(request);
            Iterator i = fileItems.iterator();
            while (i.hasNext()) {
                FileItem fi = (FileItem) i.next();
                if (!fi.isFormField()) {
                    String fileName = fi.getName();
                    String path = filePath + File.separator + fileName;
                    //System.out.println(fileName);

                    File file = new File(path);
                    fi.write(file);
                    response.getWriter().append(localPath + File.separator + fileName);
                }
            }
        } catch (Exception ex) {
            out.println("上传文件失败:" + ex.getMessage());
        } finally {
            out.close();
        }
    }
}
