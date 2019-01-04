package com.ractoc.makerplans.frontend.controller;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class RedirectToIndexFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String requestURI = req.getRequestURI();

        if (requestURI.startsWith("/img")) {
            chain.doFilter(request, response);
            return;
        }
        if (requestURI.startsWith("/built")) {
            chain.doFilter(request, response);
            return;
        }
        if (requestURI.startsWith("/style")) {
            chain.doFilter(request, response);
            return;
        }

        // all requests not api or static will be forwarded to index page.
        System.out.println("forwarding to index");
        request.getRequestDispatcher("/").forward(request, response);
    }

    @Override
    public void destroy() {

    }

}
