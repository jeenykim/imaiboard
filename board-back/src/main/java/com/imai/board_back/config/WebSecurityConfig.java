package com.imai.board_back.config;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// 80 8:43 업할때 삭제
// import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // HttpMethod 클래스 import
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.imai.board_back.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

// import static org.springframework.security.config.Customizer.withDefaults;




@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        // httpSecurity
        //     .cors().and()
        //     .csrf(csrf -> csrf.disable())
        //     .httpBasic(httpBasic -> httpBasic.disable())
        //     .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        //     .authorizeRequests(authorize -> authorize
        //     .antMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**").permitAll()
        //     .antMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/**").permitAll()
        //     .anyRequest().authenticated()
        //     )
        //     .exceptionHandling(exception -> exception
        //     .authenticationEntryPoint((request, response, authException) -> {
        //         response.setContentType("application/json");
        //         response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        //         response.getWriter().write("{ \"code\": \"NP\", \"message\": \"Do not have permission.\" }");
        //     })
        //     .accessDeniedHandler((request, response, accessDeniedException) -> {
        //         response.setContentType("application/json");
        //         response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        //         response.getWriter().write("{ \"code\": \"ND\", \"message\": \"Access denied.\" }");
        //     })
        //     );

    //    80 10:00 주석후 업버전 람다 코드기입 
        // httpSecurity
        //     .cors(withDefaults())
        //     .csrf(csrf -> csrf.disable())
        //     .httpBasic(httpBasic -> httpBasic.disable())
        //     .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        //     .authorizeRequests(authorize -> authorize
        //     .antMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**").permitAll()
        //     .antMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/**").permitAll()
        //     .anyRequest().authenticated()
        //     )
        //     .exceptionHandling(exception -> exception
        //     .authenticationEntryPoint((request, response, authException) -> {
        //         response.setContentType("application/json");
        //         response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        //         response.getWriter().write("{ \"code\": \"NP\", \"message\": \"Do not have permission.\" }");
        //     })
        //     .accessDeniedHandler((request, response, accessDeniedException) -> {
        //         response.setContentType("application/json");
        //         response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        //         response.getWriter().write("{ \"code\": \"ND\", \"message\": \"Access denied.\" }");
        //     })
        //     );

        //    80 10:00 주석후 업버전 람다 코드기입 
            httpSecurity
                .cors(cors -> cors
                    .configurationSource(corsConfigurationSource())
                )
                //80 13:10 추가 입력 
                .csrf(CsrfConfigurer::disable)
                .httpBasic(HttpBasicConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(request -> request
                    .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/**").permitAll()
                    .anyRequest().authenticated() 
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                    .authenticationEntryPoint(new FailedAuthenticationEntryPoint())    
                )

                // 10 16:30 하단 잘라내기내용 붙이기
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                
                // 80 16:28 addFilterBefore부터 잘라내서 붙이기
                // httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                // 80 16:28 삭제
                // httpSecurity;

        return httpSecurity.build();
    }

    //    80 10:27 주석후 업버전 람다 코드기입 
    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        // configuration.addExposedHeader("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);  // 자격 증명 허용 (쿠키나 인증 정보 전송 가능)
        
        // configuration.addAllowedOrigin("http://localhost:3000"); 
        // // 특정 도메인만 허용
        // configuration.addAllowedMethod("GET");
        // configuration.addAllowedMethod("POST");
        // configuration.addAllowedHeader("Authorization");  
        // // 특정 헤더만 허용
        // configuration.addExposedHeader("Authorization");


        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {
//인터페이스 생성
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{ \"code\": \"AF\", \"message\": \"Authorization Failed\" }");  
       
    }

}
